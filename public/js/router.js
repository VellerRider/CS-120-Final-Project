
class Router {
  constructor() {
    this.routes = {
      '/': 'main',
      '/index.html': 'main',
      '/book.html': 'book',
      '/login.html': 'auth',
      '/register.html': 'auth'
    };
    
    // get current module
    this.currentModule = this.routes[window.location.pathname] || 'main';
  }
  
  async init() {
    switch(this.currentModule) {
      case 'main':
        await this.loadMainPage();
        break;
      case 'book':
        await this.loadBookPage();
        break;
      case 'auth':
        await this.loadAuthPage();
        break;
      default:
        await this.loadMainPage();
    }
  }
  
  async loadMainPage() {
    try {
      const { App } = await import('./modules/mainApp.js');
      new App();
    } catch (error) {
      console.error('Failed to load main page:', error);
    }
  }
  
  async loadBookPage() {
    try {
      await import('./modules/bookpage.js');
    } catch (error) {
      console.error('Failed to load book page:', error);
    }
  }
  
  async loadAuthPage() {
    try {
      const { AuthHandler } = await import('./modules/auth.js');
      new AuthHandler();
    } catch (error) {
      console.error('Failed to load auth page:', error);
    }
  }
}

// initialize router 
document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  router.init();
});