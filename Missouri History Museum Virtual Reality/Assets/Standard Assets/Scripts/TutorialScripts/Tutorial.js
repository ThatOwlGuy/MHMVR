#pragma strict

public class Tutorial extends MonoBehaviour{
	private var titleNum : int = 0;
	private var textNum : int = 0;
	
	@SerializeField
	private var title : String[];
	@SerializeField
	private var text : String[];
	
	@SerializeField
	private var curTitle : TextMesh;
	@SerializeField
	private var curText : TextMesh;
	@SerializeField
	private var sprites : SpriteRenderer[];
	@SerializeField
	private var otherRenderedObjects : MeshRenderer[];
	
	public var fade : boolean;
	public var out : boolean;
	
	public var b : GameObject;
	public var portal : GameObject;
	
	public function Awake(){
		textNum = 0;
		titleNum = textNum;
		
		curText.text = text[textNum];
		curTitle.text = title[titleNum];
	}
	
	public function NextText(){
		textNum++;
		
		if(textNum == text.length && sprites.length < 3){			
			//activated back button
			b.SetActive(true);
			
			//make a copy of array and add "b" and its child to it
			var newArray : Array = new Array(sprites);
			newArray.Add(b.GetComponent(SpriteRenderer));
			newArray.Add(b.transform.GetChild(0).GetComponent(SpriteRenderer));
			
			//update the sprites array
			sprites = newArray;
		}
		
		if((textNum == 2 && FindObjectOfType(ActivateOnNoUI).activated == false) ){
			FadeOut();
		}else if(textNum >= text.length){
			FadeOut();
			portal.SetActive(true);
			portal.transform.position.x = transform.position.x;
			portal.transform.position.z = transform.position.z - 10;
		}else{
			curText.text = text[textNum];
			curText.GetComponent(Wrap3DText).updateText();
		}
	}
	
	public function LastText(){
		textNum--;
		if(textNum < 0){
			textNum = 0;
		}else{
			curText.text = text[textNum];
			curText.GetComponent(Wrap3DText).updateText();
		}
	}
	
	public function NextTitle(){
		titleNum++;
		curTitle.text = text[textNum];
	}
	
	public function FadeIn(){
		fade = true;
		out = false;
	}
	
	public function FadeOut(){
		fade = true;
		out = true;
	}
	
	private function LateUpdate(){
		if(!fade)
			return;
		
		var thisFloat : float = Time.deltaTime * 2;
		
		var i : int;
		
		if(out)
			thisFloat *= (-1);
		
		curTitle.color.a += thisFloat;
		curText.color.a += thisFloat;
		
		for(i = 0; i < sprites.length; i++)
			sprites[i].color.a += thisFloat;
		
		for(i = 0; i < otherRenderedObjects.length; i++)
			otherRenderedObjects[i].material.color.a += thisFloat;
		
		if(curTitle.color.a <= 0 || curText.color.a >= 1)
			fade = false;
			if(out){
				GameObject.Find("Next").tag = "Untagged";
			}else{
				GameObject.Find("Next").tag = "Triggerable";
			}
				
	}
	
}