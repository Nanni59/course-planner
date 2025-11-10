document.addEventListener('DOMContentLoaded', () => {

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // --- 1. LINK DATA ---
    const GLOBAL_LESSON_TRACKER_URL = 'https://docs.google.com/spreadsheets/d/1cIZHqJn9-RVVq-zWeM-oYsnhwQAEYFawiz6r2M_ir0o/edit?gid=47355610#gid=47355610';
    const GLOBAL_ASSIGNMENT_TRACKER_URL = 'https://docs.google.com/spreadsheets/d/1L7H6FaLGjKv53nMCo0_cT3EyoElE4arn-crZo44wGYk/edit?gid=1136951819#gid=1136951819';
    
    // Map course titles to their specific Lesson and Assignment sheet links
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
        // Day B Courses
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

    // --- 2. Tab Switching Logic ---
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            // Deactivate all
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));

            // Activate clicked
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- 3. Global Button Logic (Uses Global Links) ---
    document.getElementById('lessonTrackerBtn').addEventListener('click', () => {
        window.open(GLOBAL_LESSON_TRACKER_URL, '_blank');
    });

    document.getElementById('assignmentTrackerBtn').addEventListener('click', () => {
        window.open(GLOBAL_ASSIGNMENT_TRACKER_URL, '_blank');
    });

    // --- 4. Checkmark Click Logic (Uses Course-Specific Links) ---
    document.body.addEventListener('change', (event) => {
        if (event.target.classList.contains('task-checkbox') && event.target.checked) {
            const listItem = event.target.closest('li');
            const courseCard = listItem.closest('.course-card');
            const courseTitle = courseCard.querySelector('h3').textContent.trim();

            const links = COURSE_LINKS[courseTitle];
            
            if (links) {
                console.log(`Checkbox clicked for ${courseTitle}. Opening specific links...`);
                // Open Lesson Tracker
                window.open(links.lesson, '_blank');
                // Open Assignment Tracker
                window.open(links.assignment, '_blank');
            } else {
                 console.log(`Checkbox clicked for ${courseTitle}, but no specific links found.`);
            }
        }
    });

    // --- 5. Save Logic (using localStorage) ---
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveData('dayA');
        saveData('dayB');
        alert('Planner saved!');
    });

    function saveData(dayId) {
        const dayContainer = document.getElementById(dayId);
        const tasks = [];
        
        dayContainer.querySelectorAll('.task-list li').forEach((li) => {
            const task = {
                type: li.querySelector('.task-type').value,
                name: li.querySelector('.task-name').value,
                notes: li.querySelector('.task-notes').value, 
                checked: li.querySelector('.task-checkbox').checked,
            };
            tasks.push(task);
        });
        
        localStorage.setItem(`${dayId}_data`, JSON.stringify(tasks));
    }

    // --- 6. Load Logic (on page start) ---
    function loadData() {
        loadDay('dayA');
        loadDay('dayB');
    }

    function loadDay(dayId) {
        const data = JSON.parse(localStorage.getItem(`${dayId}_data`));
        if (!data) return;

        const dayContainer = document.getElementById(dayId);
        const listItems = dayContainer.querySelectorAll('.task-list li');

        // Iterate over the loaded data and use the index to match it to the correct course card (list item)
        data.forEach((task, index) => {
            const li = listItems[index]; 
            if (li) {
                li.querySelector('.task-type').value = task.type;
                li.querySelector('.task-name').value = task.name;
                li.querySelector('.task-checkbox').checked = task.checked;

                // Load and Resize Textarea
                const notesTextarea = li.querySelector('.task-notes');
                notesTextarea.value = task.notes;
                
                // FIX: Explicitly set height to 'auto', then to scrollHeight to force expansion immediately after loading content.
                notesTextarea.style.height = 'auto'; 
                notesTextarea.style.height = notesTextarea.scrollHeight + 'px';
            }
        });
    }

    // --- 7. Reset Logic ---
    document.getElementById('resetBtn').addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-content.active');
        const dayId = activeTab.id;

        if (confirm(`Are you sure you want to reset all fields for ${dayId.toUpperCase()}?`)) {
            localStorage.removeItem(`${dayId}_data`);
            
            activeTab.querySelectorAll('.task-list li').forEach(li => {
                li.querySelector('.task-type').selectedIndex = 0;
                li.querySelector('.task-name').value = '';
                li.querySelector('.task-checkbox').checked = false;
                
                // Reset textarea
                const notesTextarea = li.querySelector('.task-notes');
                notesTextarea.value = '';
                notesTextarea.style.height = '38px'; // Reset height to min-height defined in CSS
            });
            alert(`${dayId.toUpperCase()} has been reset. To restore old data, you must reload the page and not save.`);
        }
    });

    // --- 8. Auto-resize Textarea on Input ---
    document.body.addEventListener('input', (event) => {
        if (event.target.classList.contains('task-notes')) {
            const textarea = event.target;
            textarea.style.height = 'auto'; // Reset height to shrink if text is deleted
            textarea.style.height = (textarea.scrollHeight) + 'px'; // Set to new scroll height
        }
    });

    // --- Initial Load ---
    loadData();

});