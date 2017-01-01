#pragma strict

public class Enable extends MonoBehaviour{
	public enum Toggle {On, Off};

	public var turnThem : Toggle;

	public var theseGameObjects : GameObject[];

	public function ToggleGameObjects() : void{
		if(turnThem == Toggle.On){
			for(var thisGameObject : GameObject in theseGameObjects){
				thisGameObject.SetActive(true);
			}
		}else if(turnThem == Toggle.Off){
			for(var thisGameObject : GameObject in theseGameObjects){
				thisGameObject.SetActive(false);
			}
		}
	}

	public function Triggered() : void{
		ToggleGameObjects();
	}
}