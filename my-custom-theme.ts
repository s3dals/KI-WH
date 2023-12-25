
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
		"--theme-font-color-base": "var(--color-primary-50)",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "12px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #8ac18a 
		"--color-primary-50": "237 246 237", // #edf6ed
		"--color-primary-100": "232 243 232", // #e8f3e8
		"--color-primary-200": "226 240 226", // #e2f0e2
		"--color-primary-300": "208 230 208", // #d0e6d0
		"--color-primary-400": "173 212 173", // #add4ad
		"--color-primary-500": "138 193 138", // #8ac18a
		"--color-primary-600": "124 174 124", // #7cae7c
		"--color-primary-700": "104 145 104", // #689168
		"--color-primary-800": "83 116 83", // #537453
		"--color-primary-900": "68 95 68", // #445f44
		// secondary | #7e435e 
		"--color-secondary-50": "236 227 231", // #ece3e7
		"--color-secondary-100": "229 217 223", // #e5d9df
		"--color-secondary-200": "223 208 215", // #dfd0d7
		"--color-secondary-300": "203 180 191", // #cbb4bf
		"--color-secondary-400": "165 123 142", // #a57b8e
		"--color-secondary-500": "126 67 94", // #7e435e
		"--color-secondary-600": "113 60 85", // #713c55
		"--color-secondary-700": "95 50 71", // #5f3247
		"--color-secondary-800": "76 40 56", // #4c2838
		"--color-secondary-900": "62 33 46", // #3e212e
		// tertiary | #2ead78 
		"--color-tertiary-50": "224 243 235", // #e0f3eb
		"--color-tertiary-100": "213 239 228", // #d5efe4
		"--color-tertiary-200": "203 235 221", // #cbebdd
		"--color-tertiary-300": "171 222 201", // #abdec9
		"--color-tertiary-400": "109 198 161", // #6dc6a1
		"--color-tertiary-500": "46 173 120", // #2ead78
		"--color-tertiary-600": "41 156 108", // #299c6c
		"--color-tertiary-700": "35 130 90", // #23825a
		"--color-tertiary-800": "28 104 72", // #1c6848
		"--color-tertiary-900": "23 85 59", // #17553b
		// success | #7bdc7d 
		"--color-success-50": "235 250 236", // #ebfaec
		"--color-success-100": "229 248 229", // #e5f8e5
		"--color-success-200": "222 246 223", // #def6df
		"--color-success-300": "202 241 203", // #caf1cb
		"--color-success-400": "163 231 164", // #a3e7a4
		"--color-success-500": "123 220 125", // #7bdc7d
		"--color-success-600": "111 198 113", // #6fc671
		"--color-success-700": "92 165 94", // #5ca55e
		"--color-success-800": "74 132 75", // #4a844b
		"--color-success-900": "60 108 61", // #3c6c3d
		// warning | #5b894f 
		"--color-warning-50": "230 237 229", // #e6ede5
		"--color-warning-100": "222 231 220", // #dee7dc
		"--color-warning-200": "214 226 211", // #d6e2d3
		"--color-warning-300": "189 208 185", // #bdd0b9
		"--color-warning-400": "140 172 132", // #8cac84
		"--color-warning-500": "91 137 79", // #5b894f
		"--color-warning-600": "82 123 71", // #527b47
		"--color-warning-700": "68 103 59", // #44673b
		"--color-warning-800": "55 82 47", // #37522f
		"--color-warning-900": "45 67 39", // #2d4327
		// error | #3c0603 
		"--color-error-50": "226 218 217", // #e2dad9
		"--color-error-100": "216 205 205", // #d8cdcd
		"--color-error-200": "206 193 192", // #cec1c0
		"--color-error-300": "177 155 154", // #b19b9a
		"--color-error-400": "119 81 79", // #77514f
		"--color-error-500": "60 6 3", // #3c0603
		"--color-error-600": "54 5 3", // #360503
		"--color-error-700": "45 5 2", // #2d0502
		"--color-error-800": "36 4 2", // #240402
		"--color-error-900": "29 3 1", // #1d0301
		// surface | #202d5a 
		"--color-surface-50": "222 224 230", // #dee0e6
		"--color-surface-100": "210 213 222", // #d2d5de
		"--color-surface-200": "199 203 214", // #c7cbd6
		"--color-surface-300": "166 171 189", // #a6abbd
		"--color-surface-400": "99 108 140", // #636c8c
		"--color-surface-500": "32 45 90", // #202d5a
		"--color-surface-600": "29 41 81", // #1d2951
		"--color-surface-700": "24 34 68", // #182244
		"--color-surface-800": "19 27 54", // #131b36
		"--color-surface-900": "16 22 44", // #10162c
		
	}
}