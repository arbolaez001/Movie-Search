/**
 * LoadModal
 */
class LoadModal {
  static modalHtml(id: string) {
    return `
    <button data-target="modal${id}" class="btn modal-trigger">Modal</button>
    <!-- Modal Structure -->
    <div id="modal${id}" class="modal">
      <div class="modal-content">
        <h4>${id}</h4>
      </div>
    </div>`;
  };
};