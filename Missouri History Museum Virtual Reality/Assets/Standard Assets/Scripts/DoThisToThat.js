#pragma strict

public class DoThisToThat extends MonoBehaviour{
	@SerializeField
	private var doThis : String;
	@SerializeField
	private var toThese : GameObject[];

	public function Triggered() : void{
		for(var i : int = 0; i < toThese.length; i++)
			toThese[i].SendMessage(doThis);
	}

	public function SetThat(theseObjects : Array) : void{
		toThese = theseObjects;
	}
}