import React from 'react';
import './ReportForm.css';

const ReportForm = () => {
  return (
    <div className="reportform-root">
      <form className="reportform-form">
        <h2 className="reportform-title">Generate Report</h2>
        {[
          'Full Name',
          'Email Address',
          'Phone Number',
          'Company',
          'Position',
          'Project Name',
          'Report Title',
          'Start Date',
          'End Date',
          'Additional Notes'
        ].map((label, idx) => (
          <div className={`reportform-field reportform-field-${idx}`} key={idx}>
            <label
              htmlFor={`field${idx}`}
              className="reportform-label"
            >
              {label}
            </label>
            <input
              type="text"
              id={`field${idx}`}
              name={`field${idx}`}
              placeholder={label}
              className="reportform-input"
              onFocus={e => e.target.classList.add('reportform-input-focus')}
              onBlur={e => e.target.classList.remove('reportform-input-focus')}
              autoComplete="off"
            />
          </div>
        ))}
        <button
          type="submit"
          className="reportform-submit"
        >
          Generate Report
        </button>
      </form>
    </div>
  );
}

export default ReportForm;
