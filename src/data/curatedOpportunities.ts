import { Opportunity } from "../types";

export const curatedOpportunities = ([
  {
    "id": "cur-mlh",
    "title": "MLH Fellowship",
    "organization": "Major League Hacking",
    "type": "Fellowship / Open Source",
    "description": "A 12-week remote internship alternative for aspiring software engineers where you contribute to open source projects used by top companies.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "React",
      "Python",
      "Node.js",
      "Open Source"
    ],
    "interests": [
      "Software Engineering",
      "Open Source"
    ],
    "sourceUrl": "https://fellowship.mlh.io/",
    "applicationUrl": "https://fellowship.mlh.io/apply",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-gsoc",
    "title": "Google Summer of Code",
    "organization": "Google",
    "type": "Internship / Open Source",
    "description": "A global, online program focused on bringing new contributors into open source software development. Contributors work on a 12-week programming project.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "C++",
      "Python",
      "Java",
      "JavaScript",
      "Rust"
    ],
    "interests": [
      "Open Source",
      "Software Engineering"
    ],
    "sourceUrl": "https://summerofcode.withgoogle.com/",
    "applicationUrl": "https://summerofcode.withgoogle.com/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-outreachy",
    "title": "Outreachy",
    "organization": "Software Freedom Conservancy",
    "type": "Internship",
    "description": "Outreachy provides internships in open source and open science subject to underrepresented groups in tech.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "Documentation",
      "Design",
      "Python",
      "JavaScript",
      "Data Science"
    ],
    "interests": [
      "Open Source",
      "Diversity in Tech"
    ],
    "sourceUrl": "https://www.outreachy.org/",
    "applicationUrl": "https://www.outreachy.org/apply/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-lfx",
    "title": "LFX Mentorship",
    "organization": "Linux Foundation",
    "type": "Mentorship",
    "description": "The LFX Mentorship program trains the next generation of open source developers by matching them with experienced mentors.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "Linux",
      "Go",
      "Kubernetes",
      "C",
      "Rust"
    ],
    "interests": [
      "Open Source",
      "Infrastructure",
      "Cloud Native"
    ],
    "sourceUrl": "https://lfx.linuxfoundation.org/mentorship/",
    "applicationUrl": "https://mentorship.lfx.linuxfoundation.org/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-google-step",
    "title": "STEP Internship",
    "organization": "Google",
    "type": "Internship",
    "description": "STEP (Student Training in Engineering Program) is a 12-week developmental internship for first and second-year undergraduate students with a passion for computer science.",
    "deadline": null,
    "location": "Multiple Locations",
    "skills": [
      "Data Structures",
      "Algorithms",
      "Python",
      "Java",
      "C++"
    ],
    "interests": [
      "Software Engineering",
      "Computer Science"
    ],
    "sourceUrl": "https://buildyourfuture.withgoogle.com/programs/step",
    "applicationUrl": "https://buildyourfuture.withgoogle.com/programs/step",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-ms-explore",
    "title": "Explore Microsoft",
    "organization": "Microsoft",
    "type": "Internship",
    "description": "A 12-week summer internship program designed for first and second-year college students pursuing a degree in computer science, software engineering, or related fields.",
    "deadline": null,
    "location": "Redmond, WA / Remote",
    "skills": [
      "Programming",
      "Problem Solving",
      "Collaboration"
    ],
    "interests": [
      "Software Engineering",
      "Product Management"
    ],
    "sourceUrl": "https://careers.microsoft.com/students/us/en/us-explore-microsoft",
    "applicationUrl": "https://careers.microsoft.com/students/us/en/us-explore-microsoft",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-meta-uni",
    "title": "Meta University",
    "organization": "Meta",
    "type": "Internship",
    "description": "An immersive 10-week summer program for students from historically underrepresented groups in tech, focusing on software engineering and analytics.",
    "deadline": null,
    "location": "Menlo Park, CA / Remote",
    "skills": [
      "Python",
      "C++",
      "React",
      "Mobile Development"
    ],
    "interests": [
      "Software Engineering",
      "Social Media"
    ],
    "sourceUrl": "https://www.metacareers.com/students-and-grads/meta-university/",
    "applicationUrl": "https://www.metacareers.com/students-and-grads/meta-university/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-amazon-sde",
    "title": "Software Development Engineer Intern",
    "organization": "Amazon",
    "type": "Internship",
    "description": "Join Amazon as a Software Development Engineer intern and work on real-world projects that impact millions of customers.",
    "deadline": null,
    "location": "Seattle, WA / Multiple",
    "skills": [
      "Java",
      "C++",
      "Python",
      "Object-Oriented Design"
    ],
    "interests": [
      "Software Engineering",
      "Cloud Computing",
      "E-commerce"
    ],
    "sourceUrl": "https://www.amazon.jobs/en/teams/internships-for-students",
    "applicationUrl": "https://www.amazon.jobs/en/teams/internships-for-students",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-stripe-intern",
    "title": "Software Engineer Intern",
    "organization": "Stripe",
    "type": "Internship",
    "description": "Help build the economic infrastructure of the internet. Stripe interns ship code to production and tackle tough engineering challenges.",
    "deadline": null,
    "location": "San Francisco / Seattle / Remote",
    "skills": [
      "Ruby",
      "Go",
      "React",
      "Distributed Systems"
    ],
    "interests": [
      "FinTech",
      "Backend Development",
      "Infrastructure"
    ],
    "sourceUrl": "https://stripe.com/jobs/university",
    "applicationUrl": "https://stripe.com/jobs/university",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-openai-res",
    "title": "OpenAI Residency",
    "organization": "OpenAI",
    "type": "Residency",
    "description": "A 6-month program ideal for researchers and engineers transitioning into AI/Machine Learning.",
    "deadline": null,
    "location": "San Francisco, CA",
    "skills": [
      "PyTorch",
      "Python",
      "Machine Learning",
      "Deep Learning"
    ],
    "interests": [
      "Artificial Intelligence",
      "Research"
    ],
    "sourceUrl": "https://openai.com/careers/residency",
    "applicationUrl": "https://openai.com/careers/residency",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-yc-work",
    "title": "Work at a Startup (Internships)",
    "organization": "Y Combinator",
    "type": "Internship / Full-time",
    "description": "Find internships and jobs at YC-backed startups. Apply once to be seen by founders at hundreds of top startups.",
    "deadline": null,
    "location": "Remote / Multiple",
    "skills": [
      "React",
      "Node.js",
      "Python",
      "Startups"
    ],
    "interests": [
      "Startups",
      "Software Engineering",
      "Entrepreneurship"
    ],
    "sourceUrl": "https://www.workatastartup.com/",
    "applicationUrl": "https://www.workatastartup.com/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-hacktoberfest",
    "title": "Hacktoberfest",
    "organization": "DigitalOcean",
    "type": "Open Source",
    "description": "A month-long celebration of open-source software in October. Contribute to participating projects and earn rewards.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "Git",
      "GitHub",
      "Open Source"
    ],
    "interests": [
      "Open Source",
      "Community"
    ],
    "sourceUrl": "https://hacktoberfest.com/",
    "applicationUrl": "https://hacktoberfest.com/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-ethglobal",
    "title": "ETHGlobal Hackathons",
    "organization": "ETHGlobal",
    "type": "Hackathon",
    "description": "Join the leading Ethereum hackathon ecosystem. Build decentralized applications and learn web3 development.",
    "deadline": null,
    "location": "Global / Remote",
    "skills": [
      "Solidity",
      "React",
      "Web3.js",
      "Smart Contracts"
    ],
    "interests": [
      "Blockchain",
      "Web3",
      "Hackathons"
    ],
    "sourceUrl": "https://ethglobal.com/",
    "applicationUrl": "https://ethglobal.com/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-nasa-intern",
    "title": "NASA Data Science Internship",
    "organization": "NASA",
    "type": "Internship",
    "description": "NASA offers internships for students to work on projects related to data science, machine learning, and space exploration.",
    "deadline": null,
    "location": "Multiple / Remote",
    "skills": [
      "Python",
      "Data Analysis",
      "Machine Learning",
      "Mathematics"
    ],
    "interests": [
      "Space Exploration",
      "Data Science",
      "Research"
    ],
    "sourceUrl": "https://intern.nasa.gov/",
    "applicationUrl": "https://intern.nasa.gov/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-cern-openlab",
    "title": "CERN Openlab Summer Student Programme",
    "organization": "CERN",
    "type": "Internship",
    "description": "Work on advanced IT projects at CERN during the summer. Gain hands-on experience with cutting-edge technologies.",
    "deadline": null,
    "location": "Geneva, Switzerland",
    "skills": [
      "C++",
      "Python",
      "Physics",
      "Data Engineering"
    ],
    "interests": [
      "High Performance Computing",
      "Research",
      "Physics"
    ],
    "sourceUrl": "https://openlab.cern/education/summer-student-programme",
    "applicationUrl": "https://openlab.cern/education/summer-student-programme",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-fossasia",
    "title": "FOSSASIA Codeheat",
    "organization": "FOSSASIA",
    "type": "Open Source",
    "description": "A coding contest for FOSSASIA projects. Contribute to open source and win a chance to attend the FOSSASIA Summit.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "JavaScript",
      "Python",
      "Java",
      "Open Source"
    ],
    "interests": [
      "Open Source",
      "Community"
    ],
    "sourceUrl": "https://codeheat.org/",
    "applicationUrl": "https://codeheat.org/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-linux-kernel",
    "title": "Linux Kernel Mentorship Program",
    "organization": "Linux Foundation",
    "type": "Mentorship",
    "description": "A structured remote mentorship program providing hands-on experience in contributing to the Linux kernel.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "C",
      "Linux Kernel",
      "Operating Systems",
      "Git"
    ],
    "interests": [
      "Systems Programming",
      "Open Source",
      "Kernel"
    ],
    "sourceUrl": "https://kernel.org/mentoring/",
    "applicationUrl": "https://kernel.org/mentoring/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-czi-open",
    "title": "CZI Open Science",
    "organization": "Chan Zuckerberg Initiative",
    "type": "Grant / Open Source",
    "description": "Funding and support for open source software projects essential to biomedical research.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "Bioinformatics",
      "Python",
      "R",
      "Open Source"
    ],
    "interests": [
      "Biomedical Research",
      "Open Science",
      "Tech for Good"
    ],
    "sourceUrl": "https://chanzuckerberg.com/rfa/essential-open-source-software-for-science/",
    "applicationUrl": "https://chanzuckerberg.com/rfa/essential-open-source-software-for-science/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-girlscript",
    "title": "GirlScript Summer of Code",
    "organization": "GirlScript Foundation",
    "type": "Open Source",
    "description": "A 3-month long open source program conducted during the summer by GirlScript Foundation.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "Web Development",
      "Python",
      "Git",
      "Open Source"
    ],
    "interests": [
      "Open Source",
      "Diversity in Tech",
      "Community"
    ],
    "sourceUrl": "https://gssoc.girlscript.tech/",
    "applicationUrl": "https://gssoc.girlscript.tech/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-ibm-qiskit",
    "title": "Qiskit Advocate Program",
    "organization": "IBM Quantum",
    "type": "Mentorship / Community",
    "description": "Become a Qiskit Advocate and get exclusive access to IBM Quantum experts, networking opportunities, and mentoring.",
    "deadline": null,
    "location": "Remote",
    "skills": [
      "Quantum Computing",
      "Python",
      "Qiskit",
      "Physics"
    ],
    "interests": [
      "Quantum Computing",
      "Research",
      "Open Source"
    ],
    "sourceUrl": "https://qiskit.org/advocates/",
    "applicationUrl": "https://qiskit.org/advocates/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-datadog",
    "title": "Software Engineering Intern",
    "organization": "Datadog",
    "type": "Internship",
    "description": "Join the team building the leading monitoring and security platform for cloud applications.",
    "deadline": null,
    "location": "New York / Paris / Remote",
    "skills": [
      "Go",
      "Python",
      "React",
      "Distributed Systems"
    ],
    "interests": [
      "Infrastructure",
      "Observability",
      "Cloud Computing"
    ],
    "sourceUrl": "https://careers.datadoghq.com/students/",
    "applicationUrl": "https://careers.datadoghq.com/students/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-vercel",
    "title": "Vercel Engineering Internship",
    "organization": "Vercel",
    "type": "Internship",
    "description": "Help build the frontend cloud. Work on Next.js, Turborepo, or core Vercel infrastructure.",
    "deadline": null,
    "location": "Remote / San Francisco",
    "skills": [
      "React",
      "Next.js",
      "TypeScript",
      "Rust"
    ],
    "interests": [
      "Frontend Infrastructure",
      "Web Development",
      "Developer Tools"
    ],
    "sourceUrl": "https://vercel.com/careers",
    "applicationUrl": "https://vercel.com/careers",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-cloudflare",
    "title": "Cloudflare Internship",
    "organization": "Cloudflare",
    "type": "Internship",
    "description": "Help build a better internet. Work on edge computing, security, and global network infrastructure.",
    "deadline": null,
    "location": "Remote / Multiple",
    "skills": [
      "Go",
      "Rust",
      "C++",
      "Networking"
    ],
    "interests": [
      "Cybersecurity",
      "Edge Computing",
      "Infrastructure"
    ],
    "sourceUrl": "https://www.cloudflare.com/careers/university/",
    "applicationUrl": "https://www.cloudflare.com/careers/university/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-deepmind",
    "title": "DeepMind Research Internship",
    "organization": "Google DeepMind",
    "type": "Internship / Research",
    "description": "Collaborate with world-class researchers to advance artificial intelligence and solve real-world problems.",
    "deadline": null,
    "location": "London / Paris / Remote",
    "skills": [
      "Machine Learning",
      "Python",
      "JAX",
      "Research"
    ],
    "interests": [
      "Artificial Intelligence",
      "AGI",
      "Deep Learning"
    ],
    "sourceUrl": "https://deepmind.google/careers/students/",
    "applicationUrl": "https://deepmind.google/careers/students/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-jane-street",
    "title": "Jane Street SWE Internship",
    "organization": "Jane Street",
    "type": "Internship",
    "description": "Work on complex technical problems in trading and finance using functional programming.",
    "deadline": null,
    "location": "New York / London / Hong Kong",
    "skills": [
      "OCaml",
      "Functional Programming",
      "Algorithms",
      "C++"
    ],
    "interests": [
      "Finance",
      "Quantitative Trading",
      "Low Latency"
    ],
    "sourceUrl": "https://www.janestreet.com/join-jane-street/programs-and-events/",
    "applicationUrl": "https://www.janestreet.com/join-jane-street/programs-and-events/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-palantir",
    "title": "Palantir Path",
    "organization": "Palantir",
    "type": "Internship",
    "description": "Palantir Path is a specialized internship program for students early in their computer science studies.",
    "deadline": null,
    "location": "Multiple Locations",
    "skills": [
      "Java",
      "TypeScript",
      "Python",
      "Data Structures"
    ],
    "interests": [
      "Data Analytics",
      "Software Engineering",
      "Government Tech"
    ],
    "sourceUrl": "https://www.palantir.com/careers/students/",
    "applicationUrl": "https://www.palantir.com/careers/students/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-uber-star",
    "title": "Uber STAR Internship",
    "organization": "Uber",
    "type": "Internship",
    "description": "Uber STAR (Software Training for Academic Readiness) provides first- and second-year college students hands-on engineering experience.",
    "deadline": null,
    "location": "San Francisco / Remote",
    "skills": [
      "Java",
      "Go",
      "Python",
      "React"
    ],
    "interests": [
      "Transportation",
      "Software Engineering",
      "Mobile Development"
    ],
    "sourceUrl": "https://www.uber.com/us/en/careers/university/",
    "applicationUrl": "https://www.uber.com/us/en/careers/university/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-two-sigma",
    "title": "Two Sigma SWE Internship",
    "organization": "Two Sigma",
    "type": "Internship",
    "description": "Join Two Sigma for a summer of solving hard problems at the intersection of technology and finance.",
    "deadline": null,
    "location": "New York, NY",
    "skills": [
      "Java",
      "C++",
      "Python",
      "Data Engineering"
    ],
    "interests": [
      "Quantitative Finance",
      "Machine Learning",
      "Software Engineering"
    ],
    "sourceUrl": "https://www.twosigma.com/careers/students/",
    "applicationUrl": "https://www.twosigma.com/careers/students/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-code-for-america",
    "title": "Code for America Fellowship",
    "organization": "Code for America",
    "type": "Fellowship",
    "description": "Join Code for America to build technology that makes government services simple, accessible, and easy to use.",
    "deadline": null,
    "location": "Remote / San Francisco",
    "skills": [
      "Ruby on Rails",
      "JavaScript",
      "User Research",
      "Data Analysis"
    ],
    "interests": [
      "Civic Tech",
      "Social Impact",
      "Public Service"
    ],
    "sourceUrl": "https://codeforamerica.org/work-with-us/",
    "applicationUrl": "https://codeforamerica.org/work-with-us/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  },
  {
    "id": "cur-devpost",
    "title": "Devpost Hackathons",
    "organization": "Devpost",
    "type": "Hackathon",
    "description": "Find and register for dozens of global hackathons. Build projects, learn new skills, and win prizes.",
    "deadline": null,
    "location": "Global / Remote",
    "skills": [
      "Web Development",
      "Mobile Development",
      "APIs",
      "Prototyping"
    ],
    "interests": [
      "Hackathons",
      "Innovation",
      "Product Development"
    ],
    "sourceUrl": "https://devpost.com/",
    "applicationUrl": "https://devpost.com/",
    "sourceType": "curated",
    "verifiedAt": "2026-09-19T17:57:00.351Z",
    "verificationStatus": "verified",
    "status": "recurring",
    "lastVerified": "2026-09-19T17:57:00.353Z"
  }
]) as unknown as Opportunity[];
