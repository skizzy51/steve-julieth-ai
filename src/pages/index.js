"use client"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.scss"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [years, setYears] = useState(1)
    const [levelOfE, setLevelOfE] = useState("High school")
    const [nextJs, setNextJs] = useState("No")
    const [AIdev, setAIdev] = useState("No")
    const [salary, setSalary] = useState(10000)
    const [fullRemote, setFullRemote] = useState("No")
    const [feedback, setFeedback] = useState({
        show: false,
        text: "",
        reload: false,
        error: false,
    })
    const [emailError, setEmailError] = useState(false)
    const [openSubmit, setOpenSubmit] = useState(false)
    const [sections, setSections] = useState({
        first: true,
        second: false,
        third: false,
    })

    const firstSection = {
        first: true,
        second: false,
        third: false,
    }
    const secondSection = {
        first: false,
        second: true,
        third: false,
    }
    const thirdSection = {
        first: false,
        second: false,
        third: true,
    }

    const sectionAnimation = {
        initial: {
            x: "-100%",
            opacity: "0",
        },
        animate: {
            x: "0%",
            opacity: "1",
        },
        exit: {
            x: "-100%",
            opacity: "0",
        },
        transition: {
            type: "tween",
            damping: 10,
            stiffness: 100,
            duration: 0.2,
        },
    }

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    function handleNext() {
        if (sections.first) {
            if (name.length >= 1 && email.length >= 1 && phone.length >= 1) {
                if (
                    email.match(emailRegex) &&
                    phone.length > 9 &&
                    phone.length < 15 &&
                    !isNaN(phone)
                )
                    setSections((prev) => (prev = secondSection))
                else if (!email.match(emailRegex))
                    setFeedback(
                        (prev) =>
                            (prev = {
                                show: true,
                                text: "Invalid email address",
                                error: true,
                            })
                    )
                else if (phone.length < 10 || phone.length > 15 || isNaN(phone))
                    setFeedback(
                        (prev) =>
                            (prev = {
                                show: true,
                                text: "Please enter a valid phone number",
                                error: true,
                            })
                    )
            } else {
                setFeedback(
                    (prev) =>
                        (prev = {
                            show: true,
                            text: "To continue, fill all required input fields",
                            error: true,
                        })
                )
            }
        } else if (sections.second) {
            setSections((prev) => (prev = thirdSection))
        }
    }

    async function handleSubmit() {
        const data = {
            name,
            email,
            phone,
        }
        const response = await fetch("http://localhost:3000/api/submit", {
            method: "post",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
        console.log(response)
        if (response.response === "Successful") {
            setOpenSubmit(false)
            setFeedback(
                (prev) =>
                    (prev = {
                        show: true,
                        text: "Successfully submitted application",
                        reload: true,
                        error: false,
                    })
            )
        } else {
            setOpenSubmit(false)
            setFeedback(
                (prev) =>
                    (prev = {
                        show: true,
                        text: "Server error",
                        error: true,
                    })
            )
        }
    }

    function FeedBack() {
        return (
            <div className={styles.feedback}>
                <AnimatePresence>
                    <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: "0", opacity: 1 }}
                        className={styles.feedbackContent}
                    >
                        <div className={styles.content}>
                            <h3
                                style={{
                                    color: feedback.error
                                        ? "crimson"
                                        : "rgb(0, 188, 0)",
                                }}
                            >
                                {feedback.text}
                            </h3>
                            <button
                                onClick={() => {
                                    if (feedback.reload)
                                        window.location.reload()
                                    setFeedback((prev) => (prev.show = false))
                                }}
                            >
                                Ok
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        )
    }

    function SubmitPopup() {
        return (
            <div className={styles.feedback}>
                <AnimatePresence>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={styles.submitContent}
                    >
                        <h2>Confirm Submission</h2>
                        <div className={styles.allInfo}>
                            <div className={styles.info}>
                                <label>Name :</label>
                                <p>{name}</p>
                            </div>
                            <div className={styles.info}>
                                <label>Email :</label>
                                <p>{email}</p>
                            </div>
                            <div className={styles.info}>
                                <label>Phone number :</label>
                                <p>{phone}</p>
                            </div>
                            <div className={styles.info}>
                                <label>Address :</label>
                                <p>{address.length > 0 ? address : "null"}</p>
                            </div>
                            <div className={styles.info}>
                                <label>Years of experience :</label>
                                <p>{years}</p>
                            </div>
                            <div className={styles.info}>
                                <label>Highest level of education :</label>
                                <p>{levelOfE}</p>
                            </div>
                            <div className={styles.info}>
                                <label>
                                    Do you have 2+ years experience using Next
                                    js? :
                                </label>
                                <p>{nextJs}</p>
                            </div>
                            <div className={styles.info}>
                                <label>
                                    Are you experienced in AI development? :
                                </label>
                                <p>{AIdev}</p>
                            </div>
                            <div className={styles.info}>
                                <label>
                                    Salary expectations(₦ per month) :
                                </label>
                                <p>₦{salary}</p>
                            </div>
                            <div className={styles.info}>
                                <label>
                                    Are you comfortable working in a fulltime
                                    remote setting? :
                                </label>
                                <p>{fullRemote}</p>
                            </div>
                        </div>
                        <div className={styles.actionCont}>
                            <button onClick={() => setOpenSubmit(false)}>
                                Back
                            </button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        )
    }

    return (
        <main className={styles.Home}>
            {feedback.show ? <FeedBack /> : null}
            {openSubmit ? <SubmitPopup /> : null}
            <div className={styles.homeContainer}>
                <div className={styles.bgSection}>
                    <img src="/bg-img.png" alt="bg-img" />
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.contentContainer}>
                        <div className={styles.head}>
                            <h2>
                                Job Application (mid-level frontend developer)
                            </h2>
                            {sections.first ? (
                                <h3 data-testid="h3">Contact Info (1 of 3)</h3>
                            ) : null}
                            {sections.second ? (
                                <h3 data-testid="h3">Experience (2 of 3)</h3>
                            ) : null}
                            {sections.third ? (
                                <h3 data-testid="h3">Additional (3 of 3)</h3>
                            ) : null}
                        </div>
                        {sections.first ? (
                            <AnimatePresence>
                                <motion.div
                                    {...sectionAnimation}
                                    className={styles.allInputs}
                                >
                                    <div className={styles.inputCont}>
                                        <label>
                                            Full name <span>*</span>
                                        </label>
                                        <input
                                            data-testid="input"
                                            type="text"
                                            required={true}
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={styles.inputCont}>
                                        <label>
                                            Email <span>*</span>
                                        </label>
                                        {emailError ? (
                                            <span>Invalid email format</span>
                                        ) : null}
                                        <input
                                            aria-label="email-input"
                                            data-testid="input"
                                            type="email"
                                            required={true}
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                if (email.length < 1)
                                                    setEmailError(false)
                                                else if (
                                                    !email.match(emailRegex)
                                                )
                                                    setEmailError(true)
                                                else if (
                                                    email.match(emailRegex)
                                                )
                                                    setEmailError(false)
                                            }}
                                        />
                                    </div>
                                    <div className={styles.inputCont}>
                                        <label>
                                            Phone Number <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            data-testid="input"
                                            required={true}
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={styles.inputCont}>
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            data-testid="input"
                                            placeholder="Address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : null}

                        {sections.second ? (
                            <AnimatePresence>
                                <motion.div
                                    {...sectionAnimation}
                                    className={styles.allInputs}
                                >
                                    <div className={styles.inputCont}>
                                        <label>
                                            Years of experience <span>*</span>
                                        </label>
                                        <input
                                            type="number"
                                            data-testid="input"
                                            required={true}
                                            value={years}
                                            min={1}
                                            max={6}
                                            onChange={(e) =>
                                                setYears(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={styles.inputCont}>
                                        <label>
                                            Highest level of education{" "}
                                            <span>*</span>
                                        </label>
                                        <select
                                            value={levelOfE}
                                            onChange={(e) =>
                                                setLevelOfE(e.target.value)
                                            }
                                        >
                                            <option>High school</option>
                                            <option>Undergraduate</option>
                                            <option>Bachelor's degree</option>
                                            <option>Master's degree</option>
                                            <option>Doctorate</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputCont}>
                                        <label>
                                            Do you have 2+ years experience
                                            using Next js? <span>*</span>
                                        </label>
                                        <select
                                            value={nextJs}
                                            onChange={(e) =>
                                                setNextJs(e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputCont}>
                                        <label>
                                            Are you experienced in AI
                                            development?<span>*</span>
                                        </label>
                                        <select
                                            value={AIdev}
                                            onChange={(e) =>
                                                setAIdev(e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : null}

                        {sections.third ? (
                            <AnimatePresence>
                                <motion.div
                                    {...sectionAnimation}
                                    className={styles.allInputs}
                                >
                                    <div className={styles.inputCont}>
                                        <label>
                                            Salary expectations(₦ per month)
                                            <span>*</span>
                                        </label>
                                        <input
                                            type="number"
                                            required={true}
                                            placeholder="Amount"
                                            min={10000}
                                            max={1000000}
                                            value={salary}
                                            onChange={(e) =>
                                                setSalary(e.target.value)
                                            }
                                            data-testid="input"
                                        />
                                    </div>
                                    <div className={styles.inputCont}>
                                        <label>
                                            Are you comfortable working in a
                                            fulltime remote setting?
                                            <span>*</span>
                                        </label>
                                        <select
                                            value={fullRemote}
                                            onChange={(e) =>
                                                setFullRemote(e.target.value)
                                            }
                                        >
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : null}

                        <div className={styles.actions}>
                            <div
                                className={[
                                    styles["actionCont"],
                                    styles["back"],
                                ].join(" ")}
                            >
                                {!sections.first ? (
                                    <button
                                        onClick={() => {
                                            if (sections.third)
                                                setSections(
                                                    (prev) =>
                                                        (prev = secondSection)
                                                )
                                            else if (sections.second)
                                                setSections(
                                                    (prev) =>
                                                        (prev = firstSection)
                                                )
                                        }}
                                    >
                                        {"<<"} Back
                                    </button>
                                ) : null}
                            </div>
                            <div
                                className={[
                                    styles["actionCont"],
                                    styles["next"],
                                ].join(" ")}
                            >
                                {!sections.third ? (
                                    <button
                                        data-testid="next-btn"
                                        onClick={handleNext}
                                    >
                                        Next {">>"}
                                    </button>
                                ) : (
                                    <button onClick={() => setOpenSubmit(true)}>
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
