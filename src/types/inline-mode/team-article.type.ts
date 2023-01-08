export type TeamArticleMember = {
	type: 'article',
	id: string,
	document_file_id: string,
	title: string
	description: string,
	input_message_content: {
		message_text: string,
		parse_mode: string,
	},
	url: string,
	thumb_url: string,
	thumb_width: 500,
	thumb_height: 500,
}

type TeamArticles = TeamArticleMember[];

export default TeamArticles;
