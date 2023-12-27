import { OPENAI_KEY, MODE } from '$env/static/private';
import { oneLine, stripIndent } from 'common-tags';
import type { RequestHandler } from '@sveltejs/kit';
import type { createcompletionReqest } from 'openai';
import { error, type Config } from '@sveltejs/kit'

const api_base = "https://api.openai.com/v1/completions";

export const POST: RequestHandler = async ({ request }) => {
	try {

	// if (!OPENAI_KEY) {
	// 	throw new Error('OPENAI_KEY is missing');
	// }
	const requestData = await request.json();
	
	if (!requestData) {
		throw new Error('Request data missing');
	}

	let apikey = requestData.apikey;

	if(!apikey){
		// throw new Error('OPENAI_KEY is missing');
		return new Response(
			JSON.stringify({
				Error: 'No API key!'
			}),
			{ status: 401 }
		);
	}

	if(apikey === "servertoken"){
		apikey = OPENAI_KEY;
	}
	const { profielInfo } = requestData;

	if (MODE == 'TEST') {
		console.log(requestData);


		return new Response(
			JSON.stringify({
				application: 'Sehr geehrte Herr...'
			}),
			{ status: 200 }
		);

	}

		// const { context } = requestData;

		// if (!context) {
		// 	throw new Error('No context provided');
		// }


		// const prompt = "say hello world";

		const prompt = stripIndent`
	    ${oneLine`
	    Nutze alle folgenden Daten und Schreibe mir auf Deutsch eine sehr gute und lange Bewerbung-Schreiben auf eine Wohnung, die Bewerbung sollte höflich sein und garantiert eine Rückmeldung, schreibe statt meine Geburtsdatum meine alter, übersetzte die fremdsprachige Daten auf Deutsch :
	    `}
	    Daten: """Mein Name: ${profielInfo.fullName.trim()} Geburtsdatum: ${profielInfo.birth.trim()}
		Mein Job: ${profielInfo.job.trim()}
		Mein Arbeitgeber: ${profielInfo.employer.trim()}
		Arbeite seit: ${profielInfo.jobsince.trim()}
		Meine Hobbies: ${profielInfo.hobbys.trim()}
		Weite Infos über mich: ${profielInfo.more.trim()}
		Ich bewerbe mich auf die Wohnung in: ${requestData.address.trim()}
		Vermieter Name ist: ${requestData.fullName.trim()}
		Weitere Info über die Wohnung: ${requestData.additional.trim()}
		"""
	    `;

		// console.log(prompt);
		
		// console.log(apikey);
		const completionOpts: createcompletionReqest  = {
			model: 'text-davinci-003',
			prompt,
			max_tokens: 1056,
			temperature: 0.7,
			stream: true
		};
		
		const response = await fetch(api_base, {
			headers: { Authorization: `Bearer ${apikey}`, 
			'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(completionOpts)
		});

		

	    if(!response.ok){
	        const err = await response.json()
	        console.error(err)
			const message = err.error.message;

			return new Response(
				JSON.stringify({
					Error: message
				}),
				{ status: 400 }
			);
	        // throw new Error('Failed to create completion',err)
	    }

	    return new Response(response.body, {
	        headers: {'Content-Type': 'text/event-stream'}

	    })
	} catch (err)
	{
	    console.error(err)
	    throw new Error("An error occurred")
	}
};
