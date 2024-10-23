export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface Social {
    name: string;
    url: string;
    className: string;
}

export interface Main {
    name: string;
    occupation: string;
    description: string;
    image: string;
    bio: string;
    bio_p: string;
    contactmessage: string;
    email: string;
    phone: string;
    address: Address;
    website: string;
    resumedownload: string;
    social: Social[];
}

export interface Education {
    school: string;
    degree: string;
    graduated: string;
    description: string;
}

export interface Work {
    company: string;
    title: string;
    years: string;
    description: string;
}

export interface Skill {
    name: string;
    level: string;
}

export interface Resume {
    skillmessage: string;
    education: Education[];
    work: Work[];
    skills: Skill[];
}

export interface PortfolioProject {
    title: string;
    category: string;
    image: string;
    url: string;
}

export interface Portfolio {
    projects: PortfolioProject[];
}

export interface Volunteer {
    name: string;
    year: string;
    description: string;
}

export interface VolunteerData {
    Volunteer: Volunteer[];
}

export interface Certifications {
    Certifications: {
        name: string;
        year: string;
        description: string;
    }[];
}

export interface ResumeData {
    main: Main;
    resume: Resume;
    portfolio: Portfolio;
    Volunteer: VolunteerData;
    Certifications: Certifications;
}
