// Modal functionality
function initializeModal(btnId, modalId, closeBtnId, cancelBtnId) {
    const addBtn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);
    const cancelBtn = document.getElementById(cancelBtnId);
    
    if (!addBtn || !modal) return;
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    addBtn.addEventListener('click', openModal);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    return { openModal, closeModal };
}

// Language functionality
function initializeLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    if (!langButtons.length) return;
    
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Language strings
    const translations = {
        en: {
            dashboard: "Dashboard",
            dnsManagement: "DNS Management",
            users: "Users",
            alerts: "Alerts",
            settings: "Settings",
            search: "Search...",
            dnsServers: "DNS Servers",
            dnsRecords: "DNS Records",
            activeUsers: "Active Users",
            responseTime: "Response Time",
            serverStatus: "Server Status",
            improvement: "% improvement from last month",
            slower: "% slower than last month",
            noChange: "No change from last month",
            serverName: "Server Name",
            ipv4: "IPv4",
            ipv6: "IPv6",
            port: "Port",
            connectedUsers: "Connected Users",
            status: "Status",
            lastUpdate: "Last Update",
            actions: "Actions",
            connected: "Connected",
            active: "Active",
            disconnected: "Disconnected",
            inactive: "Inactive",
            maintenance: "Maintenance",
            pending: "Pending",
            addDnsServer: "Add DNS Server",
            addDnsRecord: "Add DNS Record",
            recordType: "Record Type",
            name: "Name",
            value: "Value",
            ttl: "TTL",
            priority: "Priority",
            lastModified: "Last Modified",
            cancel: "Cancel",
            save: "Save",
            enterServerName: "Enter server name",
            enterIPv4: "Enter IPv4 address",
            enterIPv6: "Enter IPv6 address",
            enterPort: "Enter port",
            enterConnectedUsers: "Enter number of connected users",
            enterDomainName: "Enter domain name (e.g. example.com)",
            enterRecordValue: "Enter record value (e.g. 192.168.1.1)",
            enterTTL: "Enter TTL",
            enterPriority: "Enter priority"
        },
        fa: {
            dashboard: "داشبورد",
            dnsManagement: "مدیریت DNS",
            users: "کاربران",
            alerts: "هشدارها",
            settings: "تنظیمات",
            search: "جستجو...",
            dnsServers: "تعداد سرورهای DNS",
            dnsRecords: "رکوردهای DNS",
            activeUsers: "کاربران فعال",
            responseTime: "زمان پاسخ",
            serverStatus: "وضعیت سرور",
            improvement: "% بهبود نسبت به ماه قبل",
            slower: "% کندتر از ماه قبل",
            noChange: "بدون تغییر نسبت به ماه قبل",
            serverName: "نام سرور",
            ipv4: "IPv4",
            ipv6: "IPv6",
            port: "پورت",
            connectedUsers: "کاربران متصل",
            status: "وضعیت",
            lastUpdate: "آخرین بروزرسانی",
            lastModified: "آخرین تغییر",
            actions: "عملیات",
            connected: "متصل",
            active: "فعال",
            disconnected: "قطع شده",
            inactive: "غیرفعال",
            maintenance: "تعمیر و نگهداری",
            pending: "در انتظار",
            addDnsServer: "افزودن سرور DNS",
            addDnsRecord: "افزودن رکورد DNS",
            recordType: "نوع رکورد",
            name: "نام",
            value: "مقدار",
            ttl: "TTL",
            priority: "اولویت",
            cancel: "انصراف",
            save: "ذخیره",
            enterServerName: "نام سرور را وارد کنید",
            enterIPv4: "آدرس IPv4 را وارد کنید",
            enterIPv6: "آدرس IPv6 را وارد کنید",
            enterPort: "پورت را وارد کنید",
            enterConnectedUsers: "تعداد کاربران متصل را وارد کنید",
            enterDomainName: "نام دامنه را وارد کنید (مثال: example.com)",
            enterRecordValue: "مقدار رکورد را وارد کنید (مثال: 192.168.1.1)",
            enterTTL: "مقدار TTL را وارد کنید",
            enterPriority: "مقدار اولویت را وارد کنید"
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        localStorage.setItem('language', lang);
        
        // Update active button
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update text content based on language
        updatePageText(lang);
    }
    
    function updatePageText(lang) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Update page title based on current page
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            if (currentPage.includes('index')) {
                pageTitle.textContent = translations[lang].dashboard;
            } else if (currentPage.includes('dns-management')) {
                pageTitle.textContent = translations[lang].dnsManagement;
            } else if (currentPage.includes('users')) {
                pageTitle.textContent = translations[lang].users;
            } else if (currentPage.includes('alerts')) {
                pageTitle.textContent = translations[lang].alerts;
            } else if (currentPage.includes('settings')) {
                pageTitle.textContent = translations[lang].settings;
            }
        }
        
        // Update search placeholder
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.placeholder = translations[lang].search;
        }
        
        // Update menu items
        const menuItems = document.querySelectorAll('.menu-item span');
        if (menuItems.length) {
            menuItems[0].textContent = translations[lang].dashboard;
            menuItems[1].textContent = translations[lang].dnsManagement;
            menuItems[2].textContent = translations[lang].users;
            menuItems[3].textContent = translations[lang].alerts;
            menuItems[4].textContent = translations[lang].settings;
        }
        
        // Update table title
        const tableTitle = document.querySelector('.table-title');
        if (tableTitle) {
            if (currentPage.includes('dns-management')) {
                tableTitle.textContent = translations[lang].dnsRecords;
            } else {
                tableTitle.textContent = translations[lang].dnsServers;
            }
        }
        
        // Update stat titles
        const statTitles = document.querySelectorAll('.stat-title');
        if (statTitles.length) {
            statTitles[0].textContent = translations[lang].dnsServers;
            statTitles[1].textContent = translations[lang].activeUsers;
            statTitles[2].textContent = translations[lang].responseTime;
            statTitles[3].textContent = translations[lang].serverStatus;
        }
        
        // Update stat changes
        const statChanges = document.querySelectorAll('.stat-change');
        if (statChanges.length) {
            const statValues = ['2', '5', '3', ''];
            
            statChanges[0].innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="${lang === 'fa' ? 'margin-left:0.25rem;' : 'margin-right:0.25rem;'}">
                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
                </svg>
                ${statValues[0]}${translations[lang].improvement}
            `;
            
            statChanges[1].innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="${lang === 'fa' ? 'margin-left:0.25rem;' : 'margin-right:0.25rem;'}">
                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
                </svg>
                ${statValues[1]}${translations[lang].improvement}
            `;
            
            statChanges[2].innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="${lang === 'fa' ? 'margin-left:0.25rem;' : 'margin-right:0.25rem;'}">
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                </svg>
                ${statValues[2]}${translations[lang].slower}
            `;
            
            statChanges[3].innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="${lang === 'fa' ? 'margin-left:0.25rem;' : 'margin-right:0.25rem;'}">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                </svg>
                ${translations[lang].noChange}
            `;
        }
        
        // Update table headers
        const tableHeaders = document.querySelectorAll('th');
        if (tableHeaders.length) {
            if (currentPage.includes('dns-management')) {
                // DNS Management page
                tableHeaders[0].textContent = translations[lang].recordType;
                tableHeaders[1].textContent = translations[lang].name;
                tableHeaders[2].textContent = translations[lang].value;
                tableHeaders[3].textContent = translations[lang].ttl;
                tableHeaders[4].textContent = translations[lang].priority;
                tableHeaders[5].textContent = translations[lang].status;
                tableHeaders[6].textContent = translations[lang].lastModified;
                tableHeaders[7].textContent = translations[lang].actions;
            } else {
                // DNS Servers and other pages
                tableHeaders[0].textContent = translations[lang].serverName;
                tableHeaders[1].textContent = translations[lang].ipv4;
                tableHeaders[2].textContent = translations[lang].ipv6;
                tableHeaders[3].textContent = translations[lang].port;
                tableHeaders[4].textContent = translations[lang].connectedUsers;
                tableHeaders[5].textContent = translations[lang].status;
                tableHeaders[6].textContent = translations[lang].lastUpdate;
                tableHeaders[7].textContent = translations[lang].actions;
            }
        }
        
        // Update status
        const statusElements = document.querySelectorAll('.status');
        statusElements.forEach(el => {
            if (el.classList.contains('connected') || el.classList.contains('disconnected') || el.classList.contains('maintenance')) {
                // Clear any existing text nodes (except status-dot)
                const statusDot = el.querySelector('.status-dot');
                el.innerHTML = '';
                if (statusDot) {
                    el.appendChild(statusDot);
                } else {
                    // Create status dot if missing
                    const newStatusDot = document.createElement('div');
                    newStatusDot.classList.add('status-dot');
                    el.appendChild(newStatusDot);
                }
                
                // Add the appropriate text based on status class and page
                let statusText = '';
                if (el.classList.contains('connected')) {
                    statusText = currentPage.includes('dns-management') ? 
                        translations[lang].active : 
                        translations[lang].connected;
                } else if (el.classList.contains('disconnected')) {
                    statusText = currentPage.includes('dns-management') ? 
                        translations[lang].inactive : 
                        translations[lang].disconnected;
                } else if (el.classList.contains('maintenance')) {
                    statusText = translations[lang].maintenance;
                }
                
                // Add the text node
                el.appendChild(document.createTextNode(statusText));
            }
        });
        
        // Update button text
        const addDnsBtn = document.getElementById('add-dns-btn');
        if (addDnsBtn) {
            // Keep the SVG and add text
            const svgContent = addDnsBtn.querySelector('div.add-button-icon').outerHTML;
            addDnsBtn.innerHTML = svgContent + ' ' + translations[lang].addDnsServer;
        }

        const addDnsRecordBtn = document.getElementById('add-dns-record-btn');
        if (addDnsRecordBtn) {
            // Keep the SVG and add text
            const svgContent = addDnsRecordBtn.querySelector('div.add-button-icon').outerHTML;
            addDnsRecordBtn.innerHTML = svgContent + ' ' + translations[lang].addDnsRecord;
        }
        
        // Update cancel button text
        const cancelBtns = document.querySelectorAll('#cancel-add');
        cancelBtns.forEach(btn => {
            if (btn) btn.textContent = translations[lang].cancel;
        });
        
        // Update save buttons
        const saveDnsBtn = document.getElementById('save-dns');
        if (saveDnsBtn) saveDnsBtn.textContent = translations[lang].save;
        
        const saveDnsRecordBtn = document.getElementById('save-dns-record');
        if (saveDnsRecordBtn) saveDnsRecordBtn.textContent = translations[lang].save;
        
        // Update modal title and form labels
        const modalTitles = document.querySelectorAll('.modal-title');
        modalTitles.forEach(title => {
            if (title && title.closest('#add-dns-modal')) {
                title.textContent = translations[lang].addDnsServer;
            } else if (title && title.closest('#add-dns-record-modal')) {
                title.textContent = translations[lang].addDnsRecord;
            }
        });
        
        const formLabels = document.querySelectorAll('.form-label');
        if (formLabels.length && currentPage.includes('dns-management')) {
            // DNS Records labels
            formLabels[0].textContent = translations[lang].recordType;
            formLabels[1].textContent = translations[lang].name;
            formLabels[2].textContent = translations[lang].value;
            formLabels[3].textContent = translations[lang].ttl + ' (seconds)';
            formLabels[4].textContent = translations[lang].priority;
        } else if (formLabels.length) {
            // DNS Servers labels
            formLabels[0].textContent = translations[lang].serverName;
            formLabels[1].textContent = translations[lang].ipv4;
            formLabels[2].textContent = translations[lang].ipv6;
            formLabels[3].textContent = translations[lang].port;
            formLabels[4].textContent = translations[lang].status;
        }
        
        // Update form placeholders
        const formInputs = document.querySelectorAll('.form-input');
        if (formInputs.length && currentPage.includes('dns-management')) {
            // DNS Records placeholders
            formInputs[0].placeholder = translations[lang].enterDomainName;
            formInputs[1].placeholder = translations[lang].enterRecordValue;
            formInputs[2].placeholder = translations[lang].enterTTL;
            formInputs[3].placeholder = translations[lang].enterPriority;
        } else if (formInputs.length) {
            // DNS Servers placeholders
            formInputs[0].placeholder = translations[lang].enterServerName;
            formInputs[1].placeholder = translations[lang].enterIPv4;
            formInputs[2].placeholder = translations[lang].enterIPv6;
            formInputs[3].placeholder = translations[lang].enterPort;
            formInputs[4].placeholder = translations[lang].enterConnectedUsers;
        }
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });

    // Set initial language
    setLanguage(currentLang);
}

// Initialize DNS record type functionality
function initializeDnsRecordType() {
    const recordTypeSelect = document.getElementById('record-type');
    const priorityGroup = document.getElementById('priority-group');
    
    if (!recordTypeSelect || !priorityGroup) return;
    
    recordTypeSelect.addEventListener('change', function() {
        if (this.value === 'MX' || this.value === 'SRV') {
            priorityGroup.style.display = 'block';
        } else {
            priorityGroup.style.display = 'none';
        }
    });

    // Initial check for priority visibility
    if (recordTypeSelect.value !== 'MX' && recordTypeSelect.value !== 'SRV') {
        priorityGroup.style.display = 'none';
    }
}

// JSON Database Functions
const dnsDatabase = {
    // Get all DNS servers from localStorage
    getServers: function() {
        const servers = localStorage.getItem('dnsServers');
        return servers ? JSON.parse(servers) : [];
    },
    
    // Save all DNS servers to localStorage
    saveServers: function(servers) {
        localStorage.setItem('dnsServers', JSON.stringify(servers));
    },
    
    // Add a new DNS server
    addServer: function(server) {
        const servers = this.getServers();
        servers.push({
            ...server,
            id: Date.now().toString(), // Simple unique ID
            lastUpdate: new Date().toISOString()
        });
        this.saveServers(servers);
        return servers;
    },
    
    // Update an existing DNS server
    updateServer: function(id, updatedServer) {
        let servers = this.getServers();
        const index = servers.findIndex(server => server.id === id);
        if (index !== -1) {
            servers[index] = {
                ...servers[index],
                ...updatedServer,
                lastUpdate: new Date().toISOString()
            };
            this.saveServers(servers);
        }
        return servers;
    },
    
    // Delete a DNS server
    deleteServer: function(id) {
        let servers = this.getServers();
        servers = servers.filter(server => server.id !== id);
        this.saveServers(servers);
        return servers;
    },
    
    // Clear all DNS servers
    clearServers: function() {
        localStorage.removeItem('dnsServers');
    }
};

// System Stats Database
const statsDatabase = {
    // Default values
    defaultStats: {
        dnsServers: {
            value: 12,
            change: 2,
            changeType: 'positive', // 'positive', 'negative', or 'stable'
            lastUpdate: new Date().toISOString()
        },
        activeUsers: {
            value: 342,
            change: 5,
            changeType: 'positive',
            lastUpdate: new Date().toISOString()
        },
        responseTime: {
            value: 24,
            unit: 'ms',
            change: 3,
            changeType: 'negative',
            lastUpdate: new Date().toISOString()
        },
        serverStatus: {
            value: 99.9,
            unit: '%',
            change: 0,
            changeType: 'stable',
            lastUpdate: new Date().toISOString()
        }
    },
    
    // Get all system stats from localStorage
    getStats: function() {
        const stats = localStorage.getItem('systemStats');
        return stats ? JSON.parse(stats) : this.defaultStats;
    },
    
    // Save all system stats to localStorage
    saveStats: function(stats) {
        localStorage.setItem('systemStats', JSON.stringify(stats));
    },
    
    // Update a specific stat
    updateStat: function(statName, newValue, change = null, changeType = null) {
        if (!this.defaultStats[statName]) return false;
        
        const stats = this.getStats();
        const oldValue = stats[statName].value;
        
        // If change is not provided, calculate it
        if (change === null) {
            // Calculate percent change
            if (oldValue !== 0) {
                change = Math.round(((newValue - oldValue) / oldValue) * 100);
            } else {
                change = 0;
            }
        }
        
        // If changeType is not provided, determine it
        if (changeType === null) {
            if (change > 0) {
                changeType = 'positive';
            } else if (change < 0) {
                changeType = 'negative';
            } else {
                changeType = 'stable';
            }
        }
        
        stats[statName] = {
            ...stats[statName],
            value: newValue,
            change: Math.abs(change), // Store as absolute value
            changeType: changeType,
            lastUpdate: new Date().toISOString()
        };
        
        this.saveStats(stats);
        return stats;
    },
    
    // Reset stats to default
    resetStats: function() {
        localStorage.removeItem('systemStats');
        return this.defaultStats;
    },
    
    // Auto update DNS server count based on actual servers in database
    syncDnsServerCount: function() {
        const servers = dnsDatabase.getServers();
        const stats = this.getStats();
        const oldValue = stats.dnsServers.value;
        const newValue = servers.length;
        
        if (oldValue !== newValue) {
            return this.updateStat('dnsServers', newValue);
        }
        
        return stats;
    }
};

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set active menu item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        item.classList.remove('active');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Initialize modals - find all possible modals across pages
    const modalMappings = [
        { btnId: 'add-dns-btn', modalId: 'add-dns-modal', closeBtnId: 'close-modal', cancelBtnId: 'cancel-add' },
        { btnId: 'add-dns-record-btn', modalId: 'add-dns-record-modal', closeBtnId: 'close-modal', cancelBtnId: 'cancel-add' }
    ];
    
    const activeModals = modalMappings.map(config => {
        if (document.getElementById(config.btnId) && document.getElementById(config.modalId)) {
            return initializeModal(config.btnId, config.modalId, config.closeBtnId, config.cancelBtnId);
        }
        return null;
    }).filter(Boolean);
    
    // Save functionality for all forms
    const saveButtons = ['save-dns', 'save-dns-record'];
    saveButtons.forEach(btnId => {
        const saveBtn = document.getElementById(btnId);
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (btnId === 'save-dns') {
                    // Get form values
                    const modal = saveBtn.closest('.modal');
                    const inputs = modal.querySelectorAll('.form-input');
                    const statusSelect = modal.querySelector('.form-select');
                    
                    if (inputs.length >= 5 && statusSelect) {
                        const serverData = {
                            name: inputs[0].value,
                            ipv4: inputs[1].value,
                            ipv6: inputs[2].value,
                            port: inputs[3].value,
                            connectedUsers: inputs[4].value || "0",
                            status: statusSelect.value,
                        };
                        
                        // Check if editing or creating new
                        const editingId = modal.getAttribute('data-editing-id');
                        
                        if (editingId) {
                            // Get the server to preserve connected users count
                            const servers = dnsDatabase.getServers();
                            const existingServer = servers.find(s => s.id === editingId);
                            if (existingServer) {
                                // Update server in database (now using the input field value)
                                dnsDatabase.updateServer(editingId, serverData);
                            }
                            
                            // Clear editing ID
                            modal.removeAttribute('data-editing-id');
                        } else {
                            // Add new server to database
                            dnsDatabase.addServer(serverData);
                            
                            // Update active users count randomly
                            const stats = statsDatabase.getStats();
                            const currentUsers = stats.activeUsers.value;
                            // Randomly increase active users between 1-10%
                            const userIncrease = Math.floor(Math.random() * 10) + 1;
                            const newUserCount = Math.floor(currentUsers * (1 + userIncrease / 100));
                            statsDatabase.updateStat('activeUsers', newUserCount);
                        }
                        
                        // Reset form
                        inputs.forEach(input => {
                            if (input.type === 'number') {
                                input.value = input === inputs[3] ? '53' : input === inputs[4] ? '100' : '';
                            } else {
                                input.value = '';
                            }
                        });
                        
                        // Reset modal title and save button if necessary
                        const modalTitle = modal.querySelector('.modal-title');
                        if (modalTitle && modalTitle.textContent.toLowerCase().includes('edit')) {
                            const lang = localStorage.getItem('language') || 'en';
                            modalTitle.textContent = lang === 'en' ? 'Add New DNS Server' : 'افزودن سرور DNS';
                            
                            const saveBtn = modal.querySelector('#save-dns');
                            if (saveBtn) {
                                saveBtn.textContent = lang === 'en' ? 'Save' : 'ذخیره';
                            }
                        }
                        
                        // Reload DNS servers table
                        loadDnsServersFromDatabase();
                        
                        // Reload system stats
                        loadSystemStats();
                    }
                }
                
                // Close modal regardless of type
                const modal = saveBtn.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
    
    // Load system stats
    loadSystemStats();
    
    // Load DNS servers from database
    loadDnsServersFromDatabase();
    
    // Initialize language switching
    initializeLanguageSwitch();
    
    // Initialize DNS record type functionality
    initializeDnsRecordType();
    
    // Handle responsive navbar for mobile
    function handleResponsiveNav() {
        const screenWidth = window.innerWidth;
        const sidebar = document.querySelector('.sidebar');
        const menu = document.querySelector('.menu');
        const tableContainers = document.querySelectorAll('.dns-table-container');
        
        if (screenWidth <= 768) {
            // Mobile adjustments
            if (sidebar && menu) {
                // Ensure menu is scrollable horizontally on mobile
                menu.style.overflowX = 'auto';
                menu.style.flexWrap = 'nowrap';
                
                // Make sure all menu items are visible
                const menuItems = menu.querySelectorAll('.menu-item');
                menuItems.forEach(item => {
                    item.style.flexShrink = '0';
                });
            }
            
            // Make tables scrollable on mobile
            tableContainers.forEach(container => {
                if (container) {
                    container.style.overflowX = 'auto';
                }
            });
        } else {
            // Desktop adjustments
            if (sidebar && menu) {
                menu.style.overflowX = '';
                menu.style.flexWrap = '';
            }
        }
        
        // Adjust modal heights and positions
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent && screenWidth <= 576) {
                    modalContent.style.maxHeight = `${window.innerHeight - 40}px`;
                } else if (modalContent) {
                    modalContent.style.maxHeight = '';
                }
            }
        });
    }
    
    // Call once on load
    handleResponsiveNav();
    
    // Listen for resize
    window.addEventListener('resize', handleResponsiveNav);
    
    // Fix for table overflow scrolling
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (!table.parentNode.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-responsive');
            wrapper.style.overflowX = 'auto';
            wrapper.style.width = '100%';
            
            // Insert wrapper before table in the DOM
            table.parentNode.insertBefore(wrapper, table);
            
            // Move table into wrapper
            wrapper.appendChild(table);
        }
    });
});

// Function to load DNS servers from database and display in table
function loadDnsServersFromDatabase() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // Only load on index page or pages with DNS table
    if (currentPage !== 'index.html' && !currentPage.includes('dns-management')) {
        return;
    }
    
    const tableBody = document.querySelector('table tbody');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get servers from database
    const servers = dnsDatabase.getServers();
    const lang = localStorage.getItem('language') || 'en';
    
    // If no servers in database, add a default one
    if (servers.length === 0 && currentPage === 'index.html') {
        // Add default server
        const defaultServer = {
            name: 'Main Server',
            ipv4: '185.143.234.12',
            ipv6: '2001:db8::1',
            port: '53',
            connectedUsers: '122',
            status: 'connected',
            lastUpdate: new Date().toISOString()
        };
        dnsDatabase.addServer(defaultServer);
        
        // Reload servers from database
        loadDnsServersFromDatabase();
        return;
    }
    
    // Add rows for each server
    servers.forEach(server => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', server.id);
        
        const statusClass = server.status;
        const statusText = getStatusText(statusClass, lang, currentPage);
        const formattedDate = formatLastUpdate(server.lastUpdate, lang);
        
        row.innerHTML = `
            <td>${server.name}</td>
            <td>${server.ipv4}</td>
            <td>${server.ipv6}</td>
            <td>${server.port}</td>
            <td>${server.connectedUsers}</td>
            <td>
                <div class="status ${statusClass}">
                    <div class="status-dot"></div>
                    ${statusText}
                </div>
            </td>
            <td>${formattedDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-button edit" title="${lang === 'en' ? 'Edit' : 'ویرایش'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>
                    <button class="action-button delete" title="${lang === 'en' ? 'Delete' : 'حذف'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addActionButtonsEventListeners();
}

// Helper function to get status text based on class and language
function getStatusText(statusClass, lang, currentPage) {
    if (statusClass === 'connected') {
        return currentPage.includes('dns-management') ? 
            (lang === 'en' ? 'Active' : 'فعال') : 
            (lang === 'en' ? 'Connected' : 'متصل');
    } else if (statusClass === 'disconnected') {
        return currentPage.includes('dns-management') ? 
            (lang === 'en' ? 'Inactive' : 'غیرفعال') : 
            (lang === 'en' ? 'Disconnected' : 'قطع شده');
    } else {
        return lang === 'en' ? 'Maintenance' : 'تعمیر و نگهداری';
    }
}

// Helper function to format date
function formatLastUpdate(isoDate, lang) {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) {
        return lang === 'en' ? 'Just now' : 'همین الان';
    } else if (diffMinutes < 60) {
        return lang === 'en' ? `${diffMinutes} minutes ago` : `${diffMinutes} دقیقه پیش`;
    } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        return lang === 'en' ? `${hours} hours ago` : `${hours} ساعت پیش`;
    } else {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }
}

// Function to add event listeners to action buttons
function addActionButtonsEventListeners() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.action-button.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const serverId = row.getAttribute('data-id');
            const servers = dnsDatabase.getServers();
            const server = servers.find(s => s.id === serverId);
            
            if (!server) return;
            
            // Open edit modal with server data
            const modal = document.getElementById('add-dns-modal');
            if (modal) {
                // Fill form with server data
                const inputs = modal.querySelectorAll('.form-input');
                inputs[0].value = server.name;
                inputs[1].value = server.ipv4;
                inputs[2].value = server.ipv6;
                inputs[3].value = server.port;
                inputs[4].value = server.connectedUsers;
                
                // Set the server ID as a data attribute on the modal for reference when updating
                modal.setAttribute('data-editing-id', serverId);
                
                // Set status select
                const statusSelect = modal.querySelector('.form-select');
                if (statusSelect) {
                    statusSelect.value = server.status;
                }
                
                // Change modal title to Edit
                const modalTitle = modal.querySelector('.modal-title');
                if (modalTitle) {
                    const lang = localStorage.getItem('language') || 'en';
                    modalTitle.textContent = lang === 'en' ? 'Edit DNS Server' : 'ویرایش سرور DNS';
                }
                
                // Change save button text
                const saveBtn = modal.querySelector('#save-dns');
                if (saveBtn) {
                    const lang = localStorage.getItem('language') || 'en';
                    saveBtn.textContent = lang === 'en' ? 'Update' : 'بروزرسانی';
                }
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.action-button.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const serverId = row.getAttribute('data-id');
            const serverName = row.cells[0].textContent;
            
            // Confirm before deleting
            const lang = localStorage.getItem('language') || 'en';
            const confirmMessage = lang === 'en' ? 
                `Are you sure you want to delete the server "${serverName}"?` : 
                `آیا از حذف سرور "${serverName}" اطمینان دارید؟`;
                
            if (confirm(confirmMessage)) {
                // Remove from database
                dnsDatabase.deleteServer(serverId);
                
                // Update system stats - randomly decrease active users by 1-5%
                const stats = statsDatabase.getStats();
                const currentUsers = stats.activeUsers.value;
                const userDecrease = Math.floor(Math.random() * 5) + 1;
                const newUserCount = Math.floor(currentUsers * (1 - userDecrease / 100));
                statsDatabase.updateStat('activeUsers', newUserCount);
                
                // Update response time - randomly improve by 1-3%
                const currentResponseTime = stats.responseTime.value;
                const responseImprovement = Math.floor(Math.random() * 3) + 1;
                const newResponseTime = Math.floor(currentResponseTime * (1 - responseImprovement / 100));
                statsDatabase.updateStat('responseTime', newResponseTime);
                
                // Reload stats display
                loadSystemStats();
                
                // Remove from UI with animation
                row.classList.add('fade-out');
                setTimeout(() => {
                    row.remove();
                }, 300);
            }
        });
    });
}

// Function to load system stats
function loadSystemStats() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // Only load on index page
    if (currentPage !== 'index.html') {
        return;
    }
    
    // Sync DNS server count with actual data
    statsDatabase.syncDnsServerCount();
    
    // Get stats from database
    const stats = statsDatabase.getStats();
    const lang = localStorage.getItem('language') || 'en';
    
    // Update stats display
    updateStatsDisplay(stats, lang);
}

// Update system stats display
function updateStatsDisplay(stats, lang) {
    const statValues = document.querySelectorAll('.stat-value');
    const statChanges = document.querySelectorAll('.stat-change');
    
    if (statValues.length >= 4 && statChanges.length >= 4) {
        // DNS Servers
        statValues[0].textContent = stats.dnsServers.value;
        updateStatChange(statChanges[0], stats.dnsServers.change, stats.dnsServers.changeType, lang);
        
        // Active Users
        statValues[1].textContent = stats.activeUsers.value;
        updateStatChange(statChanges[1], stats.activeUsers.change, stats.activeUsers.changeType, lang);
        
        // Response Time
        statValues[2].textContent = `${stats.responseTime.value}${stats.responseTime.unit}`;
        updateStatChange(statChanges[2], stats.responseTime.change, stats.responseTime.changeType, lang);
        
        // Server Status
        statValues[3].textContent = `${stats.serverStatus.value}${stats.serverStatus.unit}`;
        updateStatChange(statChanges[3], stats.serverStatus.change, stats.serverStatus.changeType, lang);
    }
}

// Helper function to update stat change display
function updateStatChange(element, value, type, lang) {
    if (!element) return;
    
    const translations = {
        en: {
            improvement: "% improvement from last month",
            slower: "% slower than last month",
            noChange: "No change from last month"
        },
        fa: {
            improvement: "% بهبود نسبت به ماه قبل",
            slower: "% کندتر از ماه قبل",
            noChange: "بدون تغییر نسبت به ماه قبل"
        }
    };
    
    element.className = `stat-change ${type}`;
    
    let icon, text;
    
    if (type === 'positive') {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="${lang === 'fa' ? 'margin-left:0.25rem;' : 'margin-right:0.25rem;'}">
            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>`;
        text = `${value}${translations[lang].improvement}`;
    } else if (type === 'negative') {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="${lang === 'fa' ? 'margin-left:0.25rem;' : 'margin-right:0.25rem;'}">
            <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
        </svg>`;
        text = `${value}${translations[lang].slower}`;
    } else {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="${lang === 'fa' ? 'margin-left:0.25rem;' : 'margin-right:0.25rem;'}">
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        </svg>`;
        text = translations[lang].noChange;
    }
    
    element.innerHTML = icon + text;
}
