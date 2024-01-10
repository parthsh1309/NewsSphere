function showTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('[role="Tabpanel"]');
    tabs.forEach(function (tab) {
      tab.classList.add('hidden');
    });

    // Show the selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.classList.remove('hidden');
    }
}

let tabBtns = document.querySelectorAll('.tabBtns');
tabBtns.forEach((element) => {
  element.addEventListener('click', () => {
   let tabID =  element.getAttribute('aria-controls');
    showTab(tabID);
  })
})