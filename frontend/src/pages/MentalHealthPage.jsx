import React from "react";
import GetInvolved from "../components/GetInvolved";
import "../styles/mentalhealth.css";

const MentalHealth = () => {
    return (
        <div className="mental-health-page">
            <div className="mental-health-container">
                <h1>Mental Health Resources</h1>
                <p className="tagline">Supporting Those Who Need It Most</p>

                <div className="resources-container">
                    <section className="resources uk-resources">
                        <h2>UK Mental Health Resources</h2>

                        <h3>NHS Mental Health Services</h3>
                        <ul>
                            <li>
                                <strong>Mental Health Crisis Services:</strong>
                                <ul>
                                    <li>
                                        Call <strong>999</strong> for
                                        emergencies.
                                    </li>
                                    <li>
                                        Call <strong>111</strong> for
                                        non-emergency support.
                                    </li>
                                    <li>
                                        Use{" "}
                                        <a
                                            href="https://111.nhs.uk/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            NHS 111 online
                                        </a>
                                        .
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>
                                    Local NHS Mental Health Services:
                                </strong>
                                <ul>
                                    <li>
                                        <a
                                            href="https://www.nhs.uk/service-search/mental-health/find-a-mental-health-service"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Find a local NHS service
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            IAPT self-referral
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <h3>Helplines and Text Services</h3>
                        <ul>
                            <li>
                                <strong>Samaritans:</strong> Call{" "}
                                <strong>116 123</strong> (24/7) or text{" "}
                                <strong>"SHOUT"</strong> to 85258.
                            </li>
                            <li>
                                <strong>Mind:</strong> Call{" "}
                                <strong>0300 123 3393</strong> (Mon-Fri, 9 AM –
                                6 PM) or text <strong>86463</strong>.{" "}
                                <a
                                    href="https://www.mind.org.uk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                            <li>
                                <strong>YoungMinds:</strong>
                                <ul>
                                    <li>
                                        Text <strong>"YM"</strong> to 85258.
                                    </li>
                                    <li>
                                        Parents Helpline:{" "}
                                        <strong>0808 802 5544</strong> (Mon-Fri,
                                        9:30 AM – 4 PM).
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.youngminds.org.uk"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit website
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>Shout Crisis Text Line:</strong> Text{" "}
                                <strong>"Shout"</strong> to 85258.
                            </li>
                        </ul>

                        <h3>Support for Specific Groups</h3>
                        <ul>
                            <li>
                                <strong>LGBT Foundation:</strong> Call{" "}
                                <strong>0345 3 30 30 30</strong> or{" "}
                                <a
                                    href="https://www.lgbt.foundation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                            <li>
                                <strong>Women's Aid:</strong> Call{" "}
                                <strong>0808 2000 247</strong> (Domestic
                                Violence Helpline) or{" "}
                                <a
                                    href="https://www.womensaid.org.uk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section className="resources us-resources">
                        <h2>USA Mental Health Resources</h2>

                        <h3>National Hotlines and Helplines</h3>
                        <ul>
                            <li>
                                <strong>988 Suicide & Crisis Lifeline:</strong>{" "}
                                Dial or text <strong>988</strong>.
                            </li>
                            <li>
                                <strong>Crisis Text Line:</strong> Text{" "}
                                <strong>"HELLO"</strong> to 741741.
                            </li>
                            <li>
                                <strong>SAMHSA National Helpline:</strong> Call{" "}
                                <strong>1-800-662-HELP (4357)</strong>.
                            </li>
                            <li>
                                <strong>Veterans Crisis Line:</strong> Call{" "}
                                <strong>988</strong> and press{" "}
                                <strong>1</strong>.
                            </li>
                        </ul>

                        <h3>National Organizations for Mental Health</h3>
                        <ul>
                            <li>
                                <strong>
                                    National Alliance on Mental Illness (NAMI):
                                </strong>{" "}
                                <a
                                    href="https://www.nami.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                            <li>
                                <strong>Mental Health America (MHA):</strong>{" "}
                                <a
                                    href="https://www.mhanational.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                            <li>
                                <strong>The Trevor Project:</strong> LGBTQ+
                                youth support.{" "}
                                <a
                                    href="https://www.thetrevorproject.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                            <li>
                                <strong>
                                    American Foundation for Suicide Prevention
                                    (AFSP):
                                </strong>{" "}
                                <a
                                    href="https://www.afsp.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                        </ul>

                        <h3>Specialized Resources</h3>
                        <ul>
                            <li>
                                <strong>Disaster Distress Helpline:</strong>{" "}
                                Call <strong>1-800-985-5990</strong> or text{" "}
                                <strong>"TalkWithUs"</strong> to 66746.
                            </li>
                            <li>
                                <strong>Al-Anon & Nar-Anon:</strong> Support for
                                families of individuals struggling with
                                addiction.{" "}
                                <a
                                    href="https://al-anon.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Al-Anon
                                </a>{" "}
                                |{" "}
                                <a
                                    href="https://www.nar-anon.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Nar-Anon
                                </a>
                            </li>
                            <li>
                                <strong>
                                    National Eating Disorders Association
                                    (NEDA):
                                </strong>{" "}
                                <a
                                    href="https://www.nationaleatingdisorders.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit website
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>

                <GetInvolved />
            </div>
        </div>
    );
};

export default MentalHealth;
