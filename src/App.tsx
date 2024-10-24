import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
// import About from './components/about/About';
// import Resume from '../components/resume/Resume';
// import Contact from './components/contact/Contact';
// import Testimonials from './components/testimonials/Testimonials';
// import Portfolio from './components/portfolio/Portfolio';

import { ResumeData } from './types/types';

const App = () => {
	const [resumeData, setResumeData] = useState<ResumeData | null>(null);

	const getResumeData = async () => {
		try {
			const response = await fetch('./assets/files/json/resumeData.json');
			
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data: ResumeData = await response.json();
			setResumeData(data);
		} catch (error) {
			console.error('Error fetching resume data:', error);
		}
	};

	useEffect(() => {
		getResumeData();
	}, []);

	return (
		<div className="App">
			{resumeData ? (
				<>
					<Header data={resumeData.main} />
					{/* <About data={resumeData.main} />
                    <Resume data={resumeData.resume} />
                    <Portfolio data={resumeData.portfolio} />
                    <Contact data={resumeData.main} />
                    <Footer data={resumeData.main} /> */}
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default App;
