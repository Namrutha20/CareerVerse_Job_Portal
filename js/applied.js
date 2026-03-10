// Mock job data (same as jobs.js)
const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York', type: 'Full-time', salary: '$80,000 - $120,000', description: 'Develop and maintain software applications using modern technologies. Collaborate with cross-functional teams to deliver high-quality products.', skills: ['JavaScript', 'React', 'Node.js', 'Python'], logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop&crop=center' },
    { id: 2, title: 'Data Analyst', company: 'Data Inc', location: 'San Francisco', type: 'Full-time', salary: '$70,000 - $100,000', description: 'Analyze large datasets to extract insights and create reports. Work with SQL, Python, and visualization tools to support business decisions.', skills: ['SQL', 'Python', 'Tableau', 'Excel'], logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop&crop=center' },
    { id: 3, title: 'UI/UX Designer', company: 'Creative Ltd', location: 'Los Angeles', type: 'Full-time', salary: '$75,000 - $110,000', description: 'Design intuitive user interfaces and experiences. Create wireframes, prototypes, and collaborate with developers to implement designs.', skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research'], logo: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=50&h=50&fit=crop&crop=center' },
    { id: 4, title: 'Project Manager', company: 'Manage Co', location: 'Chicago', type: 'Full-time', salary: '$85,000 - $130,000', description: 'Lead project teams, manage timelines, and ensure successful delivery. Coordinate with stakeholders and mitigate risks.', skills: ['Agile', 'Scrum', 'Jira', 'Communication'], logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=center' },
    { id: 5, title: 'DevOps Engineer', company: 'Cloud Services', location: 'Seattle', type: 'Full-time', salary: '$90,000 - $140,000', description: 'Manage cloud infrastructure, automate deployments, and ensure system reliability. Work with AWS, Docker, and CI/CD pipelines.', skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'], logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=50&h=50&fit=crop&crop=center' },
    { id: 6, title: 'Frontend Developer', company: 'Web Solutions', location: 'Austin', type: 'Full-time', salary: '$75,000 - $105,000', description: 'Build responsive web interfaces using HTML, CSS, and JavaScript. Work with frameworks like Vue.js and ensure cross-browser compatibility.', skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js'], logo: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=50&h=50&fit=crop&crop=center' },
    { id: 7, title: 'Backend Developer', company: 'Server Tech', location: 'Boston', type: 'Full-time', salary: '$85,000 - $125,000', description: 'Develop server-side logic, APIs, and databases. Ensure scalability and security of web applications.', skills: ['Java', 'Spring', 'MySQL', 'REST APIs'], logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=50&h=50&fit=crop&crop=center' },
    { id: 8, title: 'Machine Learning Engineer', company: 'AI Innovations', location: 'San Jose', type: 'Full-time', salary: '$100,000 - $160,000', description: 'Build and deploy machine learning models. Work with TensorFlow, Python, and big data technologies.', skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'], logo: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=50&h=50&fit=crop&crop=center' },
    { id: 9, title: 'Mobile App Developer', company: 'App Makers', location: 'Miami', type: 'Full-time', salary: '$80,000 - $115,000', description: 'Develop native mobile applications for iOS and Android. Use React Native and Swift/Kotlin.', skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'], logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=50&h=50&fit=crop&crop=center' },
    { id: 10, title: 'Cybersecurity Analyst', company: 'Secure Net', location: 'Washington DC', type: 'Full-time', salary: '$90,000 - $135,000', description: 'Monitor and protect network systems. Conduct security audits and respond to incidents.', skills: ['Network Security', 'Firewalls', 'SIEM', 'Ethical Hacking'], logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=50&h=50&fit=crop&crop=center' },
    { id: 11, title: 'Product Manager', company: 'Innovate Corp', location: 'Denver', type: 'Full-time', salary: '$95,000 - $145,000', description: 'Define product strategy, gather requirements, and work with engineering teams to deliver features.', skills: ['Product Strategy', 'User Stories', 'Analytics', 'Roadmapping'], logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=50&h=50&fit=crop&crop=center' },
    { id: 12, title: 'QA Engineer', company: 'Quality First', location: 'Atlanta', type: 'Full-time', salary: '$70,000 - $100,000', description: 'Test software applications, write test cases, and ensure quality standards are met.', skills: ['Selenium', 'JUnit', 'TestNG', 'Bug Tracking'], logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=50&h=50&fit=crop&crop=center' },
    { id: 13, title: 'Data Scientist', company: 'Insight Analytics', location: 'Portland', type: 'Full-time', salary: '$95,000 - $150,000', description: 'Analyze complex data sets, build predictive models, and provide actionable insights.', skills: ['R', 'Python', 'Machine Learning', 'Statistics'], logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop&crop=center' },
    { id: 14, title: 'Full Stack Developer', company: 'Complete Solutions', location: 'Phoenix', type: 'Full-time', salary: '$85,000 - $130,000', description: 'Work on both frontend and backend development. Build end-to-end web applications.', skills: ['JavaScript', 'React', 'Express', 'MongoDB'], logo: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=50&h=50&fit=crop&crop=center' },
    { id: 15, title: 'System Administrator', company: 'Infra Tech', location: 'Salt Lake City', type: 'Full-time', salary: '$75,000 - $110,000', description: 'Manage IT infrastructure, servers, and networks. Ensure system uptime and security.', skills: ['Linux', 'Windows Server', 'VMware', 'Networking'], logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=50&h=50&fit=crop&crop=center' }
];

function loadAppliedJobs() {
    const appliedList = document.getElementById('appliedList');
    appliedList.innerHTML = '';
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    
    if (appliedJobs.length === 0) {
        appliedList.innerHTML = '<p>No jobs applied yet.</p>';
        return;
    }
    
    appliedJobs.forEach(jobId => {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            const jobDiv = document.createElement('div');
            jobDiv.className = 'job';
            jobDiv.onclick = () => showJobDetails(job);
            jobDiv.innerHTML = `
                <img src="${job.logo}" alt="${job.company} logo" class="company-logo">
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Type:</strong> ${job.type}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
            `;
            appliedList.appendChild(jobDiv);
        }
    });
}

function showJobDetails(job) {
    const modal = document.getElementById('jobModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <div class="job-detail-header">
            <img src="${job.logo}" alt="${job.company} logo" class="company-logo-large">
            <div>
                <h2>${job.title}</h2>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Type:</strong> ${job.type}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
            </div>
        </div>
        <div class="job-description">
            <h3>Job Description</h3>
            <p>${job.description}</p>
        </div>
        <div class="job-skills">
            <h3>Required Skills</h3>
            <div class="skills-list">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('jobModal').style.display = 'none';
}

loadAppliedJobs();