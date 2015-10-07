// Historique


H = new Array();



function new_entry(type,val){
	return {"type":type,"val":val};
}

function new_point(x,y){
	return {"x":x,"y":y};
}
function add_entry(entry){
	H.push(entry);
}

//

function add_texte(texte,center,size,font,select){
	
	H.push({	"type":"texte",
				"val": new Array(),
				"texte":texte,
				"center":center,
				"size":size,
				"font":font,
				"select":select
				});
	//add_entry( new_entry("texte",center));
}
function add_trait(val){
	add_entry( new_entry("trait",val));
}
function add_motif(val){
	add_entry( new_entry("motif",val));
}

add_entry( new_entry("trait",[new_point(1,2)]));


console.log(H);

