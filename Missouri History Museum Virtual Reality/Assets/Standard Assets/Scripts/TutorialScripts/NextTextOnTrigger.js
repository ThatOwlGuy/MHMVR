#pragma strict

public class NextTextOnTrigger extends NextText{	
	private var activated : boolean;
	
	public function OnTriggerEnter(other : Collider){
		if(activated)
			return;
		
		if(other.tag == "Player"){
			print("activated = true;");
			activated = true;
			print("tut.FadeIn();");
			tut.FadeIn();
			print("Triggered();");
			Triggered();
		}
	}
}