import React, { useEffect, useState } from "react";
import styled from 'styled-components';

export default function Clock() {
    const [hoursDeg, setHoursDeg] = useState(0);
    const [minutesDeg, setMinutesDeg] = useState(0);
    const [secondsDeg, setSecondsDeg] = useState(0);

    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [ampm, setAmpm] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [theme, setTheme] = useState('');

    useEffect(() => {
        let intervalId = -1;
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        const runClock = () => {
            const date = new Date();
            const h = date.getHours();
            const mi = date.getMinutes();
            const s = date.getSeconds();
            const d = date.getDate();
            const mo = date.getMonth();
            const y = date.getFullYear();
            const hDeg = h * 30;
            const mDeg = mi * 6;
            const sDeg = s * 6;

            setHoursDeg(hDeg + mDeg / 12);
            setMinutesDeg(mDeg);
            setSecondsDeg(sDeg);

            setHour(h < 10 ? `0${h}` : `${h}`);
            setMinute(mi < 10 ? `0${mi}` : `${mi}`);
            setAmpm(h < 12 ? 'AM' : 'PM');
            setDay(d);
            setMonth(months[mo]);
            setYear(y);
        };

        intervalId = setInterval(runClock, 1000);

        runClock();

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        setTheme(() => {
            const storedTheme = localStorage.getItem('theme');
            document.body.classList[storedTheme === 'dark' ? 'add' : 'remove']('dark-theme');
            return storedTheme || 'light';
        });

        return () => { };
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
                <Analog data-component="analog" theme={theme}>
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
                    <DigitalTime data-component="digital-time">
                        <div>{hour}:</div>
                        <div>{minute}</div>
                        <span>{ampm}</span>
                    </DigitalTime>

                    <DigitalDate data-component="digital-date">
                        <div>{`${day} ${month}, ${year}`}</div>
                    </DigitalDate>
                </Digital>
            </TwoClocks>

            <ThemeSwitcher theme={theme}>
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
    box-shadow: ${({ theme }) => {
        if (theme === 'light') {
            return `
                -6px -6px 16px var(--white-color), 
                6px 6px 16px hsla(var(--hue-color), 30%, 86%, 1), 
                inset 6px 6px 16px hsla(var(--hue-color), 30%, 86%, 1), 
                inset -6px -6px 16px var(--white-color);
            `;
        } else {
            return `
                6px 6px 16px hsla(var(--hue-color), 8%, 12%, 1), 
                -6px -6px 16px hsla(var(--hue-color), 8%, 20%, 1), 
                inset -6px -6px 16px hsla(var(--hue-color), 8%, 20%, 1), 
                inset 6px 6px 12px hsla(var(--hue-color), 8%, 12%, 1);
            `;
        }
    }}
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
    width: ${({ width }) => `${width}`};
    height: ${({ height }) => `${height}`};
    ${(props) => `transform: rotateZ(${props.deg}deg)`}
`;

const AnalogHand = styled.div`
    position: absolute;
    background-color: ${({ which }) => which === 'seconds' ? 'var(--first-color)' : 'var(--text-color)'};
    width: ${({ width }) => `${width}`};
    height: ${({ height }) => `${height}`};
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
    display: flex;
    justify-content: center;

    > div {
        font-size: var(--biggest-font-size);
        font-weight: var(--font-medium);
        color: var(--title-color);
    }

    > span {
        font-size: var(--tiny-font-size);
        color: var(--title-color);
        font-weight: var(--font-medium);
        margin-left: var(--mb-0-25);
    }
`;

const DigitalDate = styled.div`
    text-align: center;
    font-size: var(--small-font-size);
    font-weight: var(--font-medium);
`;

const ThemeSwitcher = styled.div`
    position: fixed;
    top: 2rem;
    right: 2rem;
    display: flex;
    padding: .25rem;
    border-radius: 50%;
    box-shadow: ${({ theme }) => {
        if (theme === 'light') {
            return `
                inset -1px -1px 1px hsla(var(--hue-color), 0%, 100%, 1), 
                inset 1px 1px 1px hsla(var(--hue-color), 30%, 86%, 1);
            `;
        } else {
            return `
                inset -1px -1px 1px hsla(var(--hue-color), 8%, 20%, 1), 
                inset 1px 1px 1px hsla(var(--hue-color), 8%, 12%, 1);
            `;
        }
    }}    
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