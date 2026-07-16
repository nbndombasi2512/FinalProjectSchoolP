export const getCourseImage = (courseName = "") => {
  const normalized = courseName.toLowerCase();

  const mappings = [
    ["geology", "/images/courses/geology.svg"],
    ["chemistry education", "/images/courses/chemistry-education.svg"],
    ["chemistry", "/images/courses/chemistry.svg"],
    ["physics", "/images/courses/physics.svg"],
    ["statistics", "/images/courses/statistics.svg"],
    ["microbiology", "/images/courses/microbiology.svg"],
    ["biochemistry", "/images/courses/biochemistry.svg"],
    ["accounting", "/images/courses/accounting.svg"],
    ["banking", "/images/courses/banking.svg"],
    ["business management", "/images/courses/business.svg"],
    ["business education", "/images/courses/business-education.svg"],
    ["marking", "/images/courses/marketing.svg"],
    ["public administration", "/images/courses/public-administration.svg"],
    ["adult education", "/images/courses/adult-education.svg"],
    ["agricultural education", "/images/courses/agricultural-education.svg"],
    ["biology education", "/images/courses/biology-education.svg"],
    ["environmental education", "/images/courses/environmental-education.svg"],
    ["elementary education", "/images/courses/elementary-education.svg"],
    ["english education", "/images/courses/english-education.svg"],
  ];

  const match = mappings.find(([keyword]) => normalized.includes(keyword));
  return match ? match[1] : "/images/courses/default.svg";
};
