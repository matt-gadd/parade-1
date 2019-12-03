
const style = document.createElement('style');
style.innerHTML = `
html,
body {
	background: white !important;
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
	Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji !important;
	font-weight: 300 !important;
	font-size: 16px !important;
	line-height: 1.65 !important;
	overflow-y: hidden;
}

.report {
	background: none !important;
}

.suite .column-id, .suite .column-info, .suite .title {
	border-top-width: 0px !important;
	border-left-width: 0px !important;
	border-color: #cbd5e0 !important;
	color: #2d3748 !important;
	padding-left: 1rem !important;
	padding-right: 1rem !important;
	padding-top: .5rem !important;
	padding-bottom: .5rem !important;
	font-weight: bold !important;
	font-size: 16px !important;
}

.suite .title, .suite .column-info {
	border-top-width: 1px !important;
	border-color: #cbd5e0 !important;
}

tr:first-child .title, tr:first-child .column-info {
	border-top-width: 0px !important;
}

.report .testResult.skipped {
	display: none !important;
}

.suite .column-info {
	border-right-width: 0px !important;
	border-color: #cbd5e0 !impotant;
	min-width: 200px !important;
}

.testResult td {
	border: none !important;
}

.internReportContainer {
	margin-top: 10px !important;
	min-width: auto !important;
	display: inline-block !important;
	width: 95% !important;
}

.testResult {
	display: table-row !important;
}

.testResult .skipped,
.summary,
.reportHeader,
.reportControls,
.testStatus:before,
tr td:first-child,
tr td:nth-child(4) {
	display: none !important;
}

tr.testResult.passed {
	background: none !important;
}

.report .suite {
	background: none !important;
}

.testResult .column-info {
	unicode-bidi: embed;
	font-family: monospace;
	white-space: pre-wrap;
	font-size: 14px !important;
}

.internReportContainer {
	border: 1px solid #cbd5e0 !important;
	border-radius: .5rem !important;
	background-color: #fff !important;
}
`;
document.head.appendChild(style);
