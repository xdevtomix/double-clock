import React, { useEffect, useState } from "react";
import styled from 'styled-components';

export default function Clock() {
    const [hoursDeg, setHoursDeg] = useState(0);
    const [minutesDeg, setMinutesDeg] = useState(0);
    const [secondsDeg, setSecondsDeg] = useState(0);

    const [theme, setTheme] = useState('');

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

        const iconTheme = 'bxs-sun' // sun moon

        return () => { };
    }, []);

    useEffect(() => {
        setTheme(() => {
            const storedTheme = localStorage.getItem('theme');
            document.body.classList[storedTheme === 'dark' ? 'add' : 'remove']('dark-theme');
            return storedTheme || 'light';
        });

        return () => {};
    }, []);

    const toggleTheme = () => {
        setTheme((t) => {
            const newTheme = t === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            document.body.classList[newTheme === 'dark' ? 'add' : 'remove']('dark-theme');
            return newTheme;
        });
    };

    return (
        <Container data-component="clock">
            <TwoClocks data-component="two-clocks">
                <Analog data-component="analog" className="clock__circle">                     {/* class to be removed */}
                    <AnalogLine data-component="analog-line" which="twelve"></AnalogLine>
                    <AnalogLine data-component="analog-line" which="three"></AnalogLine>
                    <AnalogLine data-component="analog-line" which="six"></AnalogLine>
                    <AnalogLine data-component="analog-line" which="nine"></AnalogLine>

                    <AnalogCenter data-component="analog-center" />

                    <AnalogHandContainer data-component="analog-hours-container" width="140px" height="140px" deg={hoursDeg}>
                        <AnalogHand data-component="analog-hand" which="hours" width=".25rem" height="70px" />
                    </AnalogHandContainer>
                    <AnalogHandContainer data-component="analog-minutes-container" width="190px" height="190px" deg={minutesDeg}>
                        <AnalogHand data-component="analog-hand" which="minutes" width=".25rem" height="95px" />
                    </AnalogHandContainer>
                    <AnalogHandContainer data-component="analog-seconds-container" width="180px" height="180px" deg={secondsDeg}>
                        <AnalogHand data-component="analog-hand" which="seconds" width=".125rem" height="90px" />
                    </AnalogHandContainer>
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

            <ThemeSwitcher>
                <i className={`bx ${theme === 'dark' ? 'bxs-moon' : 'bxs-sun'}`} onClick={() => toggleTheme()}></i>
            </ThemeSwitcher>
            
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
    height: 100%;
`;

const Analog = styled.div`
    position: relative;
    width: 260px;
    height: 260px;
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

const AnalogHandContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: ${({width}) => `${width}`};
    height: ${({height}) => `${height}`};
    ${(props) => `transform: rotateZ(${props.deg}deg)`}
`;

const AnalogHand = styled.div`
    position: absolute;
    background-color: ${({which}) => which === 'seconds' ? 'var(--first-color)' : 'var(--text-color)'};
    width: ${({width}) => `${width}`};
    height: ${({height}) => `${height}`};
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

const ThemeSwitcher = styled.div`
    position: fixed;
    top: 2rem;
    right: 2rem;
    display: flex;
    padding: .25rem;
    border-radius: 50%;
    box-shadow: inset -1px -1px 1px hsla(var(--hue-color), 0%, 100%, 1), 
                inset 1px 1px 1px hsla(var(--hue-color), 30%, 86%, 1);
    color: var(--first-color);
    cursor: pointer;
`;

const Logo = styled.a`
    position : fixed;
    bottom : 1rem;
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