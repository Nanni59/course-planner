document.addEventListener('DOMContentLoaded', () => {

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const TAB_PREFIX = 'day';
    
    // Define colors for JavaScript use
    const COLOR_DAY_A = '#3498DB'; // Blue (used for tab switching and CSS class setup)
    const COLOR_DAY_B = '#ED7D31'; // Orange (used for tab switching and CSS class setup)
    const COLOR_DEFAULT_GRAY = '#767676'; // Matches --color-text-gray (Placeholder/Empty state)
    const COLOR_INPUT_TEXT = '#000000'; // Pure Black as requested for user-entered text

    // --- 1. LINK DATA (UNCHANGED) ---
    const GLOBAL_LESSON_TRACKER_URL = 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=47355610#gid=47355610';
    const GLOBAL_ASSIGNMENT_TRACKER_URL = 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=1136951819#gid=1136951819';
    
    const COURSE_LINKS = {
        "Advanced Functions": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=524634716#gid=524634716',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=1584333864#gid=1584333864'
        },
        "Data Management": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=756647164#gid=756647164',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=2097293087#gid=2097293087'
        },
        "English": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=155620470#gid=155620470',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=1948787438#gid=1948787438'
        },
        "Economics": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=1181486106#gid=1181486106',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=2091446936#gid=2091446936'
        },
        "Media Arts": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=90285435#gid=90285435',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=1879824067#gid=1879824067'
        },
        "Business Leadership": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=1178426117#gid=1178426117',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=111048989#gid=111048989'
        },
        "Challenge & Change": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=1855309413#gid=1855309413',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=1643643502#gid=1643643502'
        },
        "Ontario Literacy Course": {
            lesson: 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=2113032239#gid=2113032239',
            assignment: 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=1839682151#gid=1839682151'
        }
    };
    
    // --- Centralized function to manage all day-switching logic (UNCHANGED) ---
    function switchDay(dayLetter) {
        const dayId = TAB_PREFIX + dayLetter;
        
        // 1. Update localStorage for user preference
        localStorage.setItem('selectedDay', dayLetter);
        
        // 2. Update Tab Classes and Content Visibility
        tabLinks.forEach(item => {
            const isActive = item.getAttribute('data-tab') === dayId;
            item.classList.toggle('active', isActive);
        });
        tabContents.forEach(item => {
            const isActive = item.id === dayId;
            item.classList.toggle('active', isActive);
        });

        // 3. Update Body Class for CSS Variables
        if (dayLetter === 'A') {
            document.body.classList.remove('day-b');
            document.body.classList.add('day-a');
        } else {
            document.body.classList.remove('day-a');
            document.body.classList.add('day-b');
        }
        
        // 4. Resize Textareas (must run after visibility is set)
        resizeNotesForActiveDay(dayId); 
    }
    
    // --- Auto-select Day logic (UNCHANGED) ---
    function autoSelectDay() {
        const dayMap = {
          0: 'A', 1: 'B', 2: 'A', 3: 'B', 4: 'A', 5: 'A', 6: 'A' 
        };
        
        const today = new Date();
        const weekday = today.getDay();
        const desiredDay = dayMap[weekday] || 'A';
        
        const savedDay = localStorage.getItem('selectedDay');
        
        const initialDay = savedDay || desiredDay; 
        
        switchDay(initialDay);
    }
    
    // --- Textarea Resize Function (UNCHANGED) ---
    function resizeNotesForActiveDay(dayId) {
        const dayContainer = document.getElementById(dayId);
        dayContainer.querySelectorAll('.task-notes').forEach(notesTextarea => {
            notesTextarea.style.height = 'auto'; 
            
            if (notesTextarea.value) {
                notesTextarea.style.height = notesTextarea.scrollHeight + 'px';
            } else {
                 notesTextarea.style.height = '38px'; 
            }
        });
    }

    // --- 2. Tab Switching Logic (UNCHANGED) ---
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const dayId = link.getAttribute('data-tab'); 
            const dayLetter = dayId.slice(-1); 
            switchDay(dayLetter);
        });
    });

    // --- 3. Global Button Logic (UNCHANGED) ---
    document.getElementById('lessonTrackerBtn').addEventListener('click', () => {
        window.open(GLOBAL_LESSON_TRACKER_URL, '_blank');
    });

    document.getElementById('assignmentTrackerBtn').addEventListener('click', () => {
        window.open(GLOBAL_ASSIGNMENT_TRACKER_URL, '_blank');
    });

    // --- 4. Checkmark Click Logic (UNCHANGED) ---
    document.body.addEventListener('change', (event) => {
        if (event.target.classList.contains('task-checkbox') && event.target.checked) {
            const listItem = event.target.closest('li');
            const courseCard = listItem.closest('.course-card');
            const courseTitle = courseCard.querySelector('h3').textContent.trim(); 

            const links = COURSE_LINKS[courseTitle];
            
            if (links) {
                console.log(`Checkbox clicked for ${courseTitle}. Opening specific links...`);
                window.open(links.lesson, '_blank');
                window.open(links.assignment, '_blank');
            } else {
                 console.log(`Checkbox clicked for ${courseTitle}, but no specific links found.`);
            }
        }
    });

    // --- 5. Save Logic (UNCHANGED) ---
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveData('dayA');
        saveData('dayB');
        alert('Planner saved!');
    });

    function saveData(dayId) {
        const dayContainer = document.getElementById(dayId);
        const tasks = {}; 
        
        dayContainer.querySelectorAll('.course-card').forEach((card) => {
            const courseTitle = card.querySelector('h3').textContent.trim();
            const li = card.querySelector('.task-list li');

            const task = {
                type: li.querySelector('.task-type').value,
                name: li.querySelector('.task-name').value,
                notes: li.querySelector('.task-notes').value, 
                checked: li.querySelector('.task-checkbox').checked,
            };
            tasks[courseTitle] = task;
        });
        
        localStorage.setItem(`${dayId}_data`, JSON.stringify(tasks));
    }

    // --- 6. Load Logic (MODIFIED: Calls autoSelectDay) ---
    function loadData() {
        loadDay('dayA');
        loadDay('dayB');
        
        // Apply text color based on loaded data values
        document.querySelectorAll('.task-list select, .task-list input[type="text"], .task-list textarea').forEach(field => {
             applyThemeColor(field);
        });

        autoSelectDay(); 
    }

    function loadDay(dayId) {
        const data = JSON.parse(localStorage.getItem(`${dayId}_data`));
        if (!data) return;

        const dayContainer = document.getElementById(dayId);

        dayContainer.querySelectorAll('.course-card').forEach(card => {
            const courseTitle = card.querySelector('h3').textContent.trim();
            const task = data[courseTitle];

            if (task) {
                const li = card.querySelector('.task-list li');
                li.querySelector('.task-type').value = task.type;
                li.querySelector('.task-name').value = task.name;
                li.querySelector('.task-checkbox').checked = task.checked;

                li.querySelector('.task-notes').value = task.notes;
            }
        });
    }

    // --- 7. Reset Logic (MODIFIED: Clears saved preference) ---
    document.getElementById('resetBtn').addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-content.active');
        const dayId = activeTab.id;
        const dayLetter = dayId.slice(-1);

        if (confirm(`Are you sure you want to reset all fields for ${dayId.toUpperCase()}?`)) {
            localStorage.removeItem(`${dayId}_data`);
            
            // Clear the saved preference if the active tab is being reset
            if (localStorage.getItem('selectedDay') === dayLetter) {
                localStorage.removeItem('selectedDay');
            }
            
            activeTab.querySelectorAll('.task-list li').forEach(li => {
                const type = li.querySelector('.task-type');
                const name = li.querySelector('.task-name');
                const notes = li.querySelector('.task-notes');
                
                type.selectedIndex = 0;
                name.value = '';
                li.querySelector('.task-checkbox').checked = false;
                
                // Reset text colors to default gray
                type.style.color = COLOR_DEFAULT_GRAY;
                name.style.color = COLOR_DEFAULT_GRAY;

                // Reset textarea value, color and height
                notes.value = '';
                notes.style.color = COLOR_DEFAULT_GRAY;
                notes.style.height = '38px'; 
            });
            alert(`${dayId.toUpperCase()} has been reset.`);
        }
    });

    // --- NEW: Function to apply theme color to a field (MODIFIED for Pure Black) ---
    function applyThemeColor(field) {
        // Check if the field has user-entered content (value is not empty AND not equal to placeholder text if applicable)
        const hasValue = field.value !== '' && field.value !== field.getAttribute('placeholder');
        
        // Use Pure Black when there is a value, otherwise use default gray
        if (hasValue) {
            field.style.color = COLOR_INPUT_TEXT; // Set to Pure Black
        } else {
            // Revert to default gray for empty state/placeholder
            field.style.color = COLOR_DEFAULT_GRAY; 
        }
    }
    
    // --- 8. Auto-resize Textarea & Apply Color on Input (MODIFIED) ---
    document.body.addEventListener('input', (event) => {
        const target = event.target;
        
        // 1. Textarea Resize Logic
        if (target.classList.contains('task-notes')) {
            target.style.height = 'auto';
            target.style.height = (target.scrollHeight) + 'px';
        }
        
        // 2. Apply Color Logic
        if (target.classList.contains('task-type') || 
            target.classList.contains('task-name') || 
            target.classList.contains('task-notes')) {
            
            applyThemeColor(target);
        }
    });

    // --- Initial Load ---
    loadData();

});