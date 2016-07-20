#pragma strict

public class StartMenuButtons extends MonoBehaviour{
	
	@SerializeField
	private var vrMenu : GameObject;
	
	//Enables or disables the VRMenu
	public function VrMenuEnabled( yes : boolean){
		vrMenu.SetActive(yes);		
	}
	
	public function LoadLevel(thisLevel : String){
		//print("Would've loaded " + thisLevel);
		Application.LoadLevel(thisLevel);
	}
}