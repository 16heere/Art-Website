import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/about.css";
import GetInvolved from "../components/GetInvolved";

const About = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#get-involved") {
            const section = document.getElementById("get-involved");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div className="about-page">
            <div className="about-container">
                <h1>Firebird Art</h1>
                <p className="tagline">
                    Creativity. Connection. Mental Health.
                </p>

                <section className="about-section">
                    <h2>Mission</h2>
                    <p>
                        Raising awareness about mental health means illuminating
                        the conversation, breaking down stigma, and fostering an
                        environment where honest dialogue can thrive. Our
                        mission is to connect with the shared humanity in all of
                        us, offering reassurance to those supporting loved ones
                        in need or those facing mental health challenges—they
                        are never alone. Driven by a deep belief in the
                        transformative power of creativity, this platform
                        invites individuals to embrace art and become part of a
                        movement that supports solidarity within the mental
                        health community.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Story</h2>
                    <p>
                        Many of us move through life with the comforting belief
                        that love and peace will guide us through. We think of
                        life's challenges as mere bumps in the road. That
                        fragile sense of security was shattered for me when a
                        family member made a choice so devastating that it took
                        away a life I once thought was safe.
                    </p>
                    <p>
                        By the time I understood that my sister was battling a
                        mental health disorder, a fight that wouldn't resolve
                        itself, I was already too late to intervene. The
                        heartbreak wasn’t just my failure to understand the
                        depth of her suffering; it was the overwhelming silence
                        that surrounded her struggle. As a society, we had
                        failed to speak openly about it.
                    </p>
                    <p>
                        Sadly, not long ago, I lost my brother to addiction,
                        another loss that could have been prevented. In the face
                        of this pain, art has become a way to channel my grief
                        and find moments of healing. But even that doesn’t feel
                        like enough.
                    </p>
                    <p>
                        My hope now is to raise funds for mental health
                        organizations in my community, to help families like
                        mine and individuals suffering in silence. I want to
                        believe those who are struggling can find the support
                        they need before it's too late.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Artist</h2>
                    <p>
                        After watching my children dive into their creative
                        world, I wondered if paper, pens, and paints could be a
                        refuge. Learning to manipulate watercolors has proven to
                        be mind-blowingly difficult, but I’m in!
                    </p>
                    <p>
                        Though I’m still a beginner, every new piece fills me
                        with joy and curiosity that drives me from one piece to
                        the next. Each artwork I create is shaped by the love
                        and loss I’ve felt, whether through people, nature, or
                        the wonderment of imagination. I hope my art sparks
                        something in you—whether it intrigues you to look
                        deeper, evokes an unexpected thought, uncovers an
                        emotion, or triggers a smile!
                    </p>
                </section>
            </div>

            <GetInvolved />
        </div>
    );
};

export default About;
