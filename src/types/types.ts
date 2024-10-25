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

export interface Volunteer {
    organization: string;
    role: string;
    year: string;
    description: string;
}

export interface Certification {
    name: string;
    year: string;
    description: string;
}

export interface ResumeData {
    skillmessage: string;
    education: Education[];
    work: Work[];
    skills: Skill[];
    volunteer: Volunteer[];
    certifications: Certification[];
}

export interface PortfolioProject {
    title: string;
    category: string;
    image: string;
    url: string;
}

export interface PortfolioData {
    projects: PortfolioProject[];
}

export interface ResumeData {
    main: Main;
    resume: ResumeData;
    portfolio: PortfolioData;
}
