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
        // Note: Advanced Functions and Data Management are handled by their Day A entries since they are the same courses
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

    // --- 3. Global Button Logic ---
    document.getElementById('lessonTrackerBtn').addEventListener('click', () => {
        window.open(GLOBAL_LESSON_TRACKER_URL, '_blank');
    });

    document.getElementById('assignmentTrackerBtn').addEventListener('click', () => {
        window.open(GLOBAL_ASSIGNMENT_TRACKER_URL, '_blank');
    });

    // --- 4. Checkmark Click Logic ---
    document.body.addEventListener('change', (event) => {
        if (event.target.classList.contains('task-checkbox') && event.target.checked) {
            const listItem = event.target.closest('li');
            const courseCard = listItem.closest('.course-card');
            const courseTitle = courseCard.querySelector('h3').textContent.trim();

            const links = COURSE_LINKS[courseTitle];
            
            if (links) {
                // Open Lesson Tracker
                window.open(links.lesson, '_blank');
                // Open Assignment Tracker
                window.open(links.assignment, '_blank');
            }
        }
    });

    // --- 5. Save Logic (Refactored to use Course Titles as keys) ---
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveData('dayA');
        saveData('dayB');
        alert('Planner saved!');
    });

    function saveData(dayId) {
        const dayContainer = document.getElementById(dayId);
        const tasks = {}; // Store tasks as an object keyed by course name

        dayContainer.querySelectorAll('.course-card').forEach((card) => {
            const courseTitle = card.querySelector('h3').textContent.trim();
            const li = card.querySelector('.task-list li');
            
            if (li) {
                tasks[courseTitle] = {
                    type: li.querySelector('.task-type').value,
                    name: li.querySelector('.task-name').value,
                    notes: li.querySelector('.task-notes').value, 
                    checked: li.querySelector('.task-checkbox').checked,
                };
            }
        });
        
        localStorage.setItem(`${dayId}_data`, JSON.stringify(tasks));
    }

    // --- 6. Load Logic (Refactored to load by Course Titles) ---
    function loadData() {
        loadDay('dayA');
        loadDay('dayB');
    }

    function loadDay(dayId) {
        // Data is now an object, keyed by Course Title
        const data = JSON.parse(localStorage.getItem(`${dayId}_data`));
        if (!data) return;

        const dayContainer = document.getElementById(dayId);
        
        // Find every course card on the current day
        dayContainer.querySelectorAll('.course-card').forEach((card) => {
            const courseTitle = card.querySelector('h3').textContent.trim();
            // Get the saved task data using the course title
            const task = data[courseTitle]; 
            
            if (task) {
                const li = card.querySelector('.task-list li');
                const notesTextarea = li.querySelector('.task-notes');
                
                li.querySelector('.task-type').value = task.type;
                li.querySelector('.task-name').value = task.name;
                li.querySelector('.task-checkbox').checked = task.checked;

                // Load and Resize Textarea (Fix for Day B/Text Area Expansion)
                notesTextarea.value = task.notes;
                
                // Explicitly force the textarea to resize based on its content immediately
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
                notesTextarea.style.height = '38px'; // Reset height to min-height
            });
            alert(`${dayId.toUpperCase()} has been reset. To restore old data, you must reload the page and not save.`);
        }
    });

    // --- 8. Auto-resize Textarea on Input ---
    document.body.addEventListener('input', (event) => {
        if (event.target.classList.contains('task-notes')) {
            const textarea = event.target;
            textarea.style.height = 'auto'; 
            textarea.style.height = (textarea.scrollHeight) + 'px'; 
        }
    });

    // --- Initial Load ---
    loadData();

});