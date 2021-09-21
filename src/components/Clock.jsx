import React, { useEffect, useState } from "react";
import styled from 'styled-components';

export default function Clock() {
    const [hoursDeg, setHoursDeg] = useState(0);
    const [minutesDeg, setMinutesDeg] = useState(0);
    const [secondsDeg, setSecondsDeg] = useState(0);

    useEffect(() => {
        let intervalId = -1;

        const runClock = () => {
            const date = new Date();
            const hDeg = date.getHours() * 30;
            const mDeg = date.getMinutes() * 6;
            const sDeg = date.getSeconds() * 6;

            setHoursDeg(hDeg + mDeg / 12);
            setMinutesDeg(mDeg);
            setSecondsDeg(sDeg);
        };

        intervalId = setInterval(runClock, 1000);

        runClock();

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        /*==================== CLOCK & DATE TEXT ====================*/
        const textHour = document.getElementById('text-hour'),
            textMinutes = document.getElementById('text-minutes'),
            textAmPm = document.getElementById('text-ampm'),
            //   dateWeek = document.getElementById('date-day-week'),
            dateDay = document.getElementById('date-day'),
            dateMonth = document.getElementById('date-month'),
            dateYear = document.getElementById('date-year')

        const clockText = () => {
            let date = new Date()

            let hh = date.getHours(),
                ampm,
                mm = date.getMinutes(),
                day = date.getDate(),
                // dayweek = date.getDay(),
                month = date.getMonth(),
                year = date.getFullYear()

            // We change the hours from 24 to 12 hours and establish whether it is AM or PM
            if (hh >= 12) {
                hh = hh - 12
                ampm = 'PM'
            } else {
                ampm = 'AM'
            }

            // We detect when it's 0 AM and transform to 12 AM
            if (hh == 0) { hh = 12 }

            // Show a zero before hours
            if (hh < 10) { hh = `0${hh}` }

            // Show time
            textHour.innerHTML = `${hh}:`

            // Show a zero before the minutes
            if (mm < 10) { mm = `0${mm}` }

            // Show minutes
            textMinutes.innerHTML = mm

            // Show am or pm
            textAmPm.innerHTML = ampm

            // If you want to show the name of the day of the week
            // let week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

            // We get the months of the year and show it
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            // We show the day, the month and the year
            dateDay.innerHTML = day
            // dateWeek.innerHTML = `${week[dayweek]}`
            dateMonth.innerHTML = `${months[month]},`
            dateYear.innerHTML = year
        }
        setInterval(clockText, 1000) // 1000 = 1s

        clockText();
        /*==================== DARK/LIGHT THEME ====================*/
        const themeButton = document.getElementById('theme-button')
        const darkTheme = 'dark-theme'
        const iconTheme = 'bxs-sun'

        // Previously selected topic (if user selected)
        const selectedTheme = localStorage.getItem('selected-theme')
        const selectedIcon = localStorage.getItem('selected-icon')

        // We obtain the current theme that the interface has by validating the dark-theme class
        const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
        const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

        // We validate if the user previously chose a topic
        if (selectedTheme) {
            // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
            document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
            themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
        }

        // Activate / deactivate the theme manually with the button
        themeButton.addEventListener('click', () => {
            // Add or remove the dark / icon theme
            document.body.classList.toggle(darkTheme)
            themeButton.classList.toggle(iconTheme)
            // We save the theme and the current icon that the user chose
            localStorage.setItem('selected-theme', getCurrentTheme())
            localStorage.setItem('selected-icon', getCurrentIcon())
        })

        return () => { };
    }, []);

    return (
        <Container data-component="clock">
            <div className="clock__container grid">
                <div className="clock__content grid">
                    <div className="clock__circle">
                        <span className="clock__twelve"></span>
                        <span className="clock__three"></span>
                        <span className="clock__six"></span>
                        <span className="clock__nine"></span>

                        <div className="clock__rounder"></div>
                        <ClockHoursContainer hoursDeg={hoursDeg}>
                            <ClockHoursHand />
                        </ClockHoursContainer>
                        <ClockMinutesContainer minutesDeg={minutesDeg}>
                            <ClockMinutesHand />
                        </ClockMinutesContainer>
                        <ClockSecondsContainer secondsDeg={secondsDeg}>
                            <ClockSecondsHand />
                        </ClockSecondsContainer>

                        <div className="clock__theme">
                            <i className='bx bxs-moon' id="theme-button"></i>
                        </div>
                    </div>

                    <div>
                        <div className="clock__text">
                            <div className="clock__text-hour" id="text-hour"></div>
                            <div className="clock__text-minutes" id="text-minutes"></div>
                            <div className="clock__text-ampm" id="text-ampm"></div>
                        </div>

                        <div className="clock__date">
                            <span id="date-day"></span>
                            <span id="date-month"></span>
                            <span id="date-year"></span>
                        </div>
                    </div>
                </div>

                <ClockLogo href="https://www.youtube.com/c/Bedimcode/" target="_blank">Original design: Bedimcode</ClockLogo>
            </div>
        </Container>
    );
}

const Container = styled.div`
    max-width: 968px;
    margin-left: var(--mb-1);
    margin-right: var(--mb-1);
    @media screen and (min-width: 968px) {
        margin-left: auto;
        margin-right: auto;
    }
`;

const ClockHoursContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 105px;
    height: 105px;
    ${(props) => `transform: rotateZ(${props.hoursDeg}deg)`}
`;

const ClockHoursHand = styled.div`
    position: absolute;
    background-color: var(--text-color);
    width: .25rem;
    height: 3rem;
    border-radius: .75rem;
    z-index: var(--z-normal);
`;

const ClockMinutesContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 136px;
    height: 136px;
    ${(props) => `transform: rotateZ(${props.minutesDeg}deg)`}
`;

const ClockMinutesHand = styled.div`
    position: absolute;
    background-color: var(--text-color);
    width: .25rem;
    height: 4rem;
    border-radius: .75rem;
    z-index: var(--z-normal);
`;

const ClockSecondsContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 130px;
    height: 130px;
    ${(props) => `transform: rotateZ(${props.secondsDeg}deg)`}
`;

const ClockSecondsHand = styled.div`
    position: absolute;
    background-color: var(--first-color);
    width: .125rem;
    height: 5rem;
    border-radius: .75rem;
    z-index: var(--z-normal);
`;

const ClockLogo = styled.a`
    width: max-content;
    justify-self: center;
    margin-bottom: var(--mb-2-5);
    font-size: var(--smaller-font-size);
    font-weight: var(--font-medium);
    color: var(--text-color-light);
    transition: .3s;
    &:hover {
        color: var(--first-color);
    }
    @media screen and (min-width: 968px) {
        margin-bottom: 3rem;
    }
`;