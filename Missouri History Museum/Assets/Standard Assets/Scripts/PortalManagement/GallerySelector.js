#pragma strict

public class GallerySelector extends MonoBehaviour{
	@SerializeField
	private var galleries : String[];
	
	private var curGallery : int = 0;
	
	public var portal : GalleryPortal;
	
	public var portalText : TextMesh;
	
	@SerializeField
	private var lvlLoader : LoadLevelOnTrigger;
	
	@SerializeField
	private var textWidth : int;
	
	public function Start(){
		UpdateScreen();
	}
	
	public function IncrementCurGallery(){
		curGallery++;
		if(curGallery >= galleries.length){
			curGallery = 0;
		}
		
		UpdateScreen();
	}	
	
	public function DecrementCurGallery(){
		curGallery--;
		if(curGallery < 0){
			curGallery = galleries.length - 1;
		}
		
		UpdateScreen();
	}
	
	public function UpdateScreen(){
		var str : String = galleries[curGallery];
		
		lvlLoader.levelToLoad = str;
		
		if(str.length > textWidth){
			for(var i : int = str.length-1; i > 0; i--){
				if(str[i] == ' '){
					str = str.Substring(0, i) + '\n' + str.Substring(i + 1);
				}
			}
		}
		
		portalText.text = str;
	}
	
	public function CurrentGallerySelected() : String{
		return galleries[curGallery];
	}
}