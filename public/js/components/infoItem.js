export function renderInfoItem(info) {
        return `
            <div class="info-item" data-type="${info.type.toLowerCase()}">
                <div class="info-title">${info.title}</div>

            </div>
        `;
}