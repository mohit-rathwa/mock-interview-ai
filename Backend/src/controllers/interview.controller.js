const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


// Sample resume text used for demo/guest mode
const DEMO_SAMPLE_RESUME = `John Doe
Software Developer
Email: john.doe@example.com | Phone: (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

SUMMARY
Motivated software developer with 2 years of experience building web applications using JavaScript, React, and Node.js. Passionate about clean code and continuous learning.

EXPERIENCE
Junior Software Developer | TechStartup Inc. | Jan 2023 - Present
- Developed and maintained RESTful APIs using Node.js and Express
- Built responsive front-end interfaces with React and Tailwind CSS
- Collaborated in Agile sprints and conducted code reviews
- Improved API response times by 30% through query optimization

Software Development Intern | WebAgency Co. | Jun 2022 - Dec 2022
- Assisted in building client websites using HTML, CSS, and JavaScript
- Wrote unit tests using Jest, increasing code coverage from 40% to 75%
- Participated in daily standups and sprint planning sessions

EDUCATION
B.S. Computer Science | State University | 2022

SKILLS
Languages: JavaScript, TypeScript, Python, SQL
Frameworks: React, Node.js, Express, Next.js
Tools: Git, Docker, MongoDB, PostgreSQL, AWS S3
`;


/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    // Verify user ownership of the report before generating PDF
    if (interviewReport.user.toString() !== req.user.id) {
        return res.status(403).json({
            message: "You are not authorized to access this report."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


/**
 * @description Controller for demo/guest mode. Generates an interview report without authentication.
 * Uses a hardcoded sample resume and accepts jobDescription and selfDescription as text.
 * Does not save the report to the database.
 * TODO: Add rate limiting to prevent abuse of the demo endpoint
 */
async function generateDemoReportController(req, res) {
    const { jobDescription, selfDescription } = req.body

    if (!jobDescription || !selfDescription) {
        return res.status(400).json({
            message: "Please provide both jobDescription and selfDescription."
        })
    }

    const interViewReportByAi = await generateInterviewReport({
        resume: DEMO_SAMPLE_RESUME,
        selfDescription,
        jobDescription
    })

    res.status(200).json({
        message: "Demo interview report generated successfully.",
        interviewReport: interViewReportByAi
    })
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, generateDemoReportController }
