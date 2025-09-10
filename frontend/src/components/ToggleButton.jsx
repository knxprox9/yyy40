import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Button = forwardRef(function Button({ active = false, onClick = () => {} }, ref) {
  const handleClick = (e) => {
    e.stopPropagation();
    try { console.log('ToggleButton: click'); } catch {}
    onClick();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="toggle" role="button" aria-label="فتح الصفحة المصغرة" title="فتح الصفحة المصغرة">
          <input
            ref={ref}
            type="checkbox"
            checked={active}
            readOnly
            aria-label="فتح الصفحة المصغرة"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          />
          <span className="button" onClick={handleClick} />
          <span className="label" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
            </svg>
          </span>
        </div>
      </div>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.div`
  .toggle {
    display: inline-block;
  }

  .toggle {
    position: relative;
    height: 100px;
    width: 100px;
    cursor: pointer;
  }

  .toggle:before {
    box-shadow: 0;
    border-radius: 84.5px;
    background: #fff;
    position: absolute;
    margin-left: -36px;
    margin-top: -36px;
    opacity: 0.2;
    height: 72px;
    width: 72px;
    left: 50%;
    top: 50%;
    content: '';
  }

  .toggle .button {
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5), inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2), 0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 3px 4px -1px rgba(255, 255, 255, 0.2), inset 0 0 5px 1px rgba(255, 255, 255, 0.8), inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
    border-radius: 68.8px;
    position: absolute;
    background: #ffffff;
    margin-left: -34.4px;
    margin-top: -34.4px;
    display: block;
    height: 68.8px;
    width: 68.8px;
    left: 50%;
    top: 50%;
  }

  .toggle .label {
    transition: color 300ms ease-out;
    line-height: 101px;
    text-align: center;
    position: absolute;
    font-weight: 700;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
    height: 100%;
    width: 100%;
    color: rgba(0, 0, 0, 0.9);
    pointer-events: none; /* allow parent to handle clicks */
  }

  .toggle input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 1;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }

  .toggle input:focus-visible {
    outline: 3px solid #2563EB;
    outline-offset: 2px;
  }

  .toggle input:active ~ .button {
    filter: blur(0.5px);
    box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4), inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9), 0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 8px 25px 0 rgba(0, 0, 0, 0.4), inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
  }

  .toggle input:active ~ .label {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.45);
  }

  .toggle input:checked ~ .button {
    filter: blur(0.5px);
    box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.4), inset 0 -8px 25px -1px rgba(255, 255, 255, 0.9), 0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 8px 20px 0 rgba(0, 0, 0, 0.2), inset 0 0 5px 1px rgba(255, 255, 255, 0.6);
  }

  .toggle input:checked ~ .label {
    color: rgba(0, 0, 0, 0.8);
  }

  .toggle .button:focus-visible, .toggle .label:focus-visible {
    outline: 3px solid #2563EB;
    outline-offset: 2px;
  }
`;

export default Button;