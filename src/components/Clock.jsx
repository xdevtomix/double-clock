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
            <TwoClocks data-component="two-clocks">
                <Analog data-component="analog" className="clock__circle">                     {/* class to be removed */}
                    <AnalogLine data-component="analog-line" which="twelve"></AnalogLine>
                    <AnalogLine data-component="analog-line" which="three"></AnalogLine>
                    <AnalogLine data-component="analog-line" which="six"></AnalogLine>
                    <AnalogLine data-component="analog-line" which="nine"></AnalogLine>

                    <AnalogCenter data-component="analog-center" />

                    <AnalogHoursContainer data-component="analog-hours-container" hoursDeg={hoursDeg}>
                        <AnalogHoursHand data-component="analog-hours-hand" />
                    </AnalogHoursContainer>
                    <AnalogMinutesContainer data-component="analog-minutes-container" minutesDeg={minutesDeg}>
                        <AnalogMinutesHand data-component="analog-minutes-hand" />
                    </AnalogMinutesContainer>
                    <AnalogSecondsContainer data-component="analog-seconds-container" secondsDeg={secondsDeg}>
                        <AnalogSecondsHand data-component="analog-seconds-hand" />
                    </AnalogSecondsContainer>

                    <div className="clock__theme">
                        <i className='bx bxs-moon' id="theme-button"></i>
                    </div>
                </Analog>

                <Digital data-component="digital">
                    <DigitalTime data-component="digital-time" className="clock__text">
                        <div className="clock__text-hour" id="text-hour"></div>
                        <div className="clock__text-minutes" id="text-minutes"></div>
                        <div className="clock__text-ampm" id="text-ampm"></div>
                    </DigitalTime>

                    <DigitalDate data-component="digital-date" className="clock__date">
                        <span id="date-day"></span>
                        <span id="date-month"></span>
                        <span id="date-year"></span>
                    </DigitalDate>
                </Digital>
            </TwoClocks>

            <Logo href="https://www.youtube.com/c/Bedimcode/" target="_blank">Original design: Bedimcode</Logo>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const TwoClocks = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 90%;
`;

const Analog = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    box-shadow: -6px -6px 16px var(--white-color), 
                6px 6px 16px hsla(var(--hue-color), 30%, 86%, 1), 
                inset 6px 6px 16px hsla(var(--hue-color), 30%, 86%, 1), 
                inset -6px -6px 16px var(--white-color);
    border-radius: 50%;
    justify-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AnalogLine = styled.div`
    position: absolute;
    width: 1rem;
    height: 1px;
    background-color: var(--text-color-light);
    ${({ which }) => {
        if (which === 'twelve') {
            return 'top: 1.25rem; left: 50%; transform: translateX(-50%) rotate(90deg);';
        } else if (which === 'three') {
            return 'top: 50%; right: .75rem;';
        } else if (which === 'six') {
            return 'bottom: 1.25rem; left: 50%; transform: translateX(-50%) rotate(90deg);';
        } else if (which === 'nine') {
            return 'left: .75rem; top: 50%;';
        }
    }}  
`;

const AnalogCenter = styled.div`
    width: .75rem;
    height: .75rem;
    background-color: var(--first-color);
    border-radius: 50%;
    border: 2px solid var(--body-color);
    z-index: var(--z-tooltip);
`;

const AnalogHoursContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 105px;
    height: 105px;
    ${(props) => `transform: rotateZ(${props.hoursDeg}deg)`}
`;

const AnalogHoursHand = styled.div`
    position: absolute;
    background-color: var(--text-color);
    width: .25rem;
    height: 3rem;
    border-radius: .75rem;
    z-index: var(--z-normal);
`;

const AnalogMinutesContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 136px;
    height: 136px;
    ${(props) => `transform: rotateZ(${props.minutesDeg}deg)`}
`;

const AnalogMinutesHand = styled.div`
    position: absolute;
    background-color: var(--text-color);
    width: .25rem;
    height: 4rem;
    border-radius: .75rem;
    z-index: var(--z-normal);
`;

const AnalogSecondsContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 130px;
    height: 130px;
    ${(props) => `transform: rotateZ(${props.secondsDeg}deg)`}
`;

const AnalogSecondsHand = styled.div`
    position: absolute;
    background-color: var(--first-color);
    width: .125rem;
    height: 5rem;
    border-radius: .75rem;
    z-index: var(--z-normal);
`;

const Digital = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DigitalTime = styled.div`

`;

const DigitalDate = styled.div`

`;

const Logo = styled.a`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--smaller-font-size);
    font-weight: var(--font-medium);
    color: var(--text-color-light);
    transition: .3s;
    &:hover {
        color: var(--first-color);
    }
`;