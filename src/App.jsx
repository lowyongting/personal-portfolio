import { useEffect } from "react";
import { useJson } from "./hooks/useJson";
import Nav from "./components/Nav/Nav";
import Hero from "./components/Hero/Hero";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
import Footer from "./components/Footer/Footer";

export default function App() {
  const shared = useJson("portfolio_shared_data.json");
  const resume = useJson("res_primaryLanguage.json");

  const basicInfo = shared.data?.basic_info;
  useEffect(() => {
    if (basicInfo?.name) document.title = basicInfo.name;
  }, [basicInfo?.name]);

  const error = shared.error || resume.error;
  if (error) {
    return <p className="container">Could not load portfolio data: {error.message}</p>;
  }
  if (!shared.data || !resume.data) return null;

  const { basic_info: about, experience, projects, education } = resume.data;
  const sections = about.section_name;

  const navLinks = [
    { id: "about", label: sections.about },
    { id: "experience", label: sections.experience },
    { id: "projects", label: sections.projects },
    { id: "education", label: "Education" },
    { id: "skills", label: sections.skills },
    { id: "contact", label: sections.contact },
  ];

  return (
    <>
      <Nav name={basicInfo.name} links={navLinks} />
      <main>
        <Hero id="about" basicInfo={basicInfo} about={about} />
        <Experience id="experience" title={sections.experience} items={experience} />
        <Projects id="projects" title={sections.projects} items={projects} />
        <Education id="education" title={sections.education} items={education} />
        <Skills id="skills" title={sections.skills} skills={shared.data.skills} />
      </main>
      <Footer id="contact" basicInfo={basicInfo} links={navLinks} />
    </>
  );
}
