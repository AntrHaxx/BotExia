
module.exports = {
	name: "doc",
	type: ["dm"],
	roles: ["admin"],
	execute: function(message, args, client) {
		if (!args.length)
			return Msg.info("indiquer la section de documentation a lire ainsi que la source.");
		let doc = args[0];
		let file = args[1];
		try {
			doc = require ("../../json/docs/"+doc+"s/"+file+".json");
			let fields = [];
			let msg = {
				author: {
					name: "Documentation: "+doc.name
				},
				description: doc.description
			};
			delete doc.name;
			delete doc.description;
			for (field in doc)
			{
				fields.push({
					name: field,
					value: doc[field]
				});
			}
			msg.fields = fields;
			Msg.format(msg);
		} catch(e) {
			Msg.error("Documentation non trouvee: "+e);
		}
	}
};