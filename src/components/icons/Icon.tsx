import React from 'react';

export type IconName =
    | 'github'
    | 'linkedin'
    | 'facebook'
    | 'instagram'
    | 'mail'
    | 'phone'
    | 'download'
    | 'arrow-up'
    | 'arrow-right'
    | 'external-link'
    | 'menu'
    | 'close'
    | 'chevron-down'
    | 'map-pin'
    | 'briefcase'
    | 'graduation-cap'
    | 'heart'
    | 'badge'
    | 'sun'
    | 'moon';

interface IconProps {
    name: IconName;
    className?: string;
}

const paths: Record<IconName, React.ReactNode> = {
    github: (
        <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.52-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.8 10.8 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    ),
    linkedin: (
        <>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM.5 8.98h4v14.02h-4V8.98Z" />
            <path d="M8.5 8.98h3.83v1.92h.05c.53-1 1.85-2.06 3.8-2.06 4.07 0 4.82 2.68 4.82 6.16v8h-4v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75v7.22h-4V8.98Z" />
        </>
    ),
    facebook: (
        <path d="M15.12 8.03h2.63V4.2h-2.63c-2.83 0-4.87 2.16-4.87 4.99v1.94H7.9v3.83h2.35V23h3.9v-8.04h2.62l.53-3.83h-3.15V9.19c0-.7.63-1.16 1.97-1.16Z" />
    ),
    instagram: (
        <>
            <rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="17.35" cy="6.65" r="1.15" />
        </>
    ),
    mail: (
        <>
            <rect x="2" y="4.5" width="20" height="15" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="m3.3 6 8.7 6.5L20.7 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    phone: (
        <path d="M6.6 2.9 3.2 4.4c-.6.27-1 .9-.9 1.6.6 4.4 2.6 8.5 5.7 11.6a17.2 17.2 0 0 0 11.6 5.7c.7.1 1.33-.3 1.6-.9l1.5-3.4a1.6 1.6 0 0 0-.7-2.05l-3.9-1.95a1.6 1.6 0 0 0-1.85.32l-1.5 1.5a13.4 13.4 0 0 1-6.15-6.15l1.5-1.5c.5-.5.63-1.25.32-1.85L8.65 3.6a1.6 1.6 0 0 0-2.05-.7Z" />
    ),
    download: (
        <>
            <path d="M12 3v12.2M7 10.8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 17v2.7A2.3 2.3 0 0 0 6.8 22h10.4a2.3 2.3 0 0 0 2.3-2.3V17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    'arrow-up': (
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    'arrow-right': (
        <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    'external-link': (
        <>
            <path d="M9 6H5.3A2.3 2.3 0 0 0 3 8.3v10.4A2.3 2.3 0 0 0 5.3 21h10.4a2.3 2.3 0 0 0 2.3-2.3V15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 3h7v7M21 3l-9.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    menu: (
        <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    ),
    close: (
        <path d="m5 5 14 14M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    ),
    'chevron-down': (
        <path d="m5.5 8.5 6.5 6.5 6.5-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    'map-pin': (
        <>
            <path d="M12 22s7.5-7.1 7.5-12.7a7.5 7.5 0 1 0-15 0C4.5 14.9 12 22 12 22Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <circle cx="12" cy="9.3" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </>
    ),
    briefcase: (
        <>
            <rect x="2.5" y="7" width="19" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8 7V5.3A1.8 1.8 0 0 1 9.8 3.5h4.4A1.8 1.8 0 0 1 16 5.3V7" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M2.5 12.5h19" stroke="currentColor" strokeWidth="1.7" />
        </>
    ),
    'graduation-cap': (
        <>
            <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M6.5 10.7v4.3c0 1.5 2.46 3 5.5 3s5.5-1.5 5.5-3v-4.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M21 9v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
    ),
    heart: (
        <path d="M12 21s-7.8-4.9-10.4-9.9C.1 8 1.5 4.3 5 3.4c2-.5 4 .3 5.2 2 .2.3.7.3.9 0 1.2-1.7 3.2-2.5 5.2-2 3.5.9 4.9 4.6 3.4 7.7C19.8 16.1 12 21 12 21Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    ),
    badge: (
        <>
            <circle cx="12" cy="9" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="m8.3 13.8-1.4 6.7 5.1-2.6 5.1 2.6-1.4-6.7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </>
    ),
    sun: (
        <>
            <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M12 1.8v2.6M12 19.6v2.6M22.2 12h-2.6M4.4 12H1.8M19 5l-1.85 1.85M6.85 17.15 5 19M19 19l-1.85-1.85M6.85 6.85 5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
            />
        </>
    ),
    moon: <path d="M20.5 14.7A8.6 8.6 0 0 1 9.3 3.5a8.6 8.6 0 1 0 11.2 11.2Z" />,
};

const Icon: React.FC<IconProps> = ({ name, className }) => (
    <svg
        className={`icon icon-${name}${className ? ` ${className}` : ''}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {paths[name]}
    </svg>
);

export default Icon;
