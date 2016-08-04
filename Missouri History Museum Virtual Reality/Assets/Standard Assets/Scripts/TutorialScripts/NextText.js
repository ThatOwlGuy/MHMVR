#pragma strict

public class NextText extends MonoBehaviour{
	
	@SerializeField
	private var forward : boolean;
	
	@SerializeField
	protected var tut : Tutorial;
	
	public function Triggered(){
		if(forward){
			tut.NextText();
		}else{
			tut.LastText();
		}
	}
}