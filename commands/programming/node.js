// @ts-check
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const error = require('../../utils/error')

const base = 'https://nodejs.org';

let data = null;

module.exports = {
    name: 'node',
    
    async execute(client, message, args) {
        error.send('test001')

        const findRec = (o, name, type, module) => {
            error.send('test002')
            name = name.toLowerCase();
            if (!module) module = o?.type === 'module' ? o?.name.toLowerCase() : undefined;
            if (o?.name?.toLowerCase() === name.toLowerCase() && o?.type === type) {
                o.module = module;
                return o;
            }
            for (const prop of Object.keys(o)) {
                if (Array.isArray(o[prop])) {
                    for (const entry of o[prop]) {
                        const res = findRec(entry, name, type, module);
                        if (res) {
                            o.module = module;
                            return res;
                        }
                    }
                }
            }
        }
		
		
		function anchor(text, module) {
            const method = text
			.toLowerCase()
			.replace(/ |`|\[|\]|\)/g, '')
			.replace(/\.|\(|,|:/g, '_');
			return `${module}#${method}`;
		}
		
        (async (query)  => {
            try {
        if (!data) {
            //@ts-ignore
			data = await fetch(`${API_BASE}/dist/latest/docs/api/all.json`).then(r => r.json());
		}
        
		const queryParts = query.split(/#|\./);
		const altQuery = queryParts[queryParts.length - 1];
        
		const result =
        findRec(data, query, 'class') ??
        findRec(data, query, 'classMethod') ??
        findRec(data, query, 'method') ??
        findRec(data, query, 'event') ??
        findRec(data, altQuery, 'class') ??
        findRec(data, altQuery, 'method') ??
        findRec(data, altQuery, 'event') ??
        findRec(data, altQuery, 'classMethod') ??
        findRec(data, query, 'module') ??
        findRec(data, altQuery, 'module');
        
		if (!result) {
			return message.ireply(`No result found for query \`${query}\`.`, { flags: 64 });
		}
        
		const moduleURL = `${base}/api/${result.module}`;
		const fullURL = `${moduleURL}.html${result.type === 'module' ? '' : `#${anchor(result.textRaw, result.module)}`}`;
		const parts = [`[**${result.textRaw}**](<${fullURL}>)`];
        
		const intro = (result.desc ?? 'no intro').split('\n\n')[0];
		const linkReplaceRegex = /\[(.+?)\]\((.+?)\)/g;
		const boldCodeBlockRegex = /`\*\*(.*)\*\*`/g;
        
		parts.push(intro.replace(linkReplaceRegex, `[$1](<${base}/$2>)`).replace(boldCodeBlockRegex, '**`$1`**'));
        
		message.ireply(`${parts.join('\n')}`);
	} catch (e) {
        
    }
})(args.join(" "))
}
}