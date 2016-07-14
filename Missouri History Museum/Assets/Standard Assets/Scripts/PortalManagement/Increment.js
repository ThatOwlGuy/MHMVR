#pragma strict

public class Increment extends MonoBehaviour{
	
	public var increment : boolean;
	
	private function IncrementCurGallery(){
		var selector : GallerySelector = FindObjectOfType(GallerySelector);
		
		if(increment){
			selector.IncrementCurGallery();
		}else{
			selector.DecrementCurGallery();
		}
	}
	
	public function Triggered(){
		IncrementCurGallery();
	}
	
}