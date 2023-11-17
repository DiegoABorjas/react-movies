import React from "react"
import githubIcon from "../assets/icons/github.png"
import linkedIn from "../assets/icons/linkedin.png"
import brandIcon from "../assets/icons/brand-logo.png"


export default function Footer() {
    return (
        <>
        <footer id="footer" className="bg-dark mb-0 d-flex justify-content-center">
            <span className="bg-dark text-white flex gap-4 text-xl justify-center">
                <a href="https://diegoborjas.netlify.app/" target="_blank" rel="noreferrer noopener" >
                <img style={{width: 80 + 'px'}} className="m-2" src={brandIcon} alt="github icon" />
                </a>
                <a href="https://github.com/DiegoABorjas" target="_blank" rel="noreferrer noopener" >
                <img style={{width: 37 + 'px'}} className="m-2" src={githubIcon} alt="github icon" />
                </a>
                <a href="https://www.linkedin.com/in/diego-borjas-gonzalez-dev/" target="_blank" rel="noreferrer noopener" >
                <img style={{width: 40 + 'px'}} className="m-2" src={linkedIn} alt="github icon" />
                </a>
            </span>
        </footer>
        </>
    )
}