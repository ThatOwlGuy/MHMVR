#pragma strict

public class ProceduralArea extends MonoBehaviour{
	public var procGen : ProceduralGenerator;
	
	function OnTriggerEnter(other : Collider){
		//print("ENTERED");
		if (other.tag == "Player"){
			procGen.inArea = true;
		}
	}
	
	function OnTriggerExit(other : Collider){
		//print(other.name + " EXITED");
		if (other.tag == "Player"){
			procGen.inArea = false;
		}
	}
}