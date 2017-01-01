#pragma strict

public class ArtifactInfoTrigger extends MonoBehaviour{
	private var playerHead : Transform;
	public var maxDist : float;

	@SerializeField
	private var infoPanel : GameObject;
	private var artefactTriggers : ArtifactInfoTrigger[];

	private function Awake() : void {
		playerHead = GameObject.Find("Head").transform;
		artefactTriggers = FindObjectsOfType(ArtifactInfoTrigger);
	}

	public function Update() : void{
		if(infoPanel != null){
			if(Vector3.Distance(transform.position, playerHead.position) > maxDist){
				MakeTriggerable();
			}
		}
	}

	public function Triggered() : void{
		MakePanel();
	}

	private function MakePanel() : void{
		//Instantiate the panel
		infoPanel = GameObject.Instantiate(Resources.Load("InformationPanel"), transform.position, transform.rotation) as GameObject;

		//set the panel's exit button to this gameObject by...
		//getting the first child's 3rd daughter's 4th son's component
		var exitButton : DoThisToThat = GameObject.Find("ExitButton").GetComponent(DoThisToThat);
		//and then setting what "That" should be
		//by converting all of the artefactInfoTriggers into gameobjects
		var newArray : Array = new Array();
		for(var i : int = 0; i < artefactTriggers.length; i++){
			newArray.Add(artefactTriggers[i].gameObject);
		}

		exitButton.SetThat(newArray);

		//then make all other artefacts unselectable
		MakeIgnorable();

		//send the sprite over to the informationPanel
		var ip : Information = infoPanel.GetComponent("Information");

		ip.SetSprite(name);

		//target that changes tothe appropriate object
		var curTextObject : Text;

		//Set the title
		curTextObject = ip.transform.GetChild(0).GetChild(2).GetChild(0).GetComponent(Text);
		curTextObject.text = GetTextFrom("Text/Titles");

		//Set the Date
		curTextObject = ip.transform.GetChild(0).GetChild(2).GetChild(1).GetComponent(Text);
		curTextObject.text = GetTextFrom("Text/Dates");

		//Set the description
		curTextObject = ip.transform.GetChild(0).GetChild(2).GetChild(6).GetChild(0).GetComponent(Text);
		curTextObject.text = GetTextFrom("Text/Descriptions");
	}

	public function MakeIgnorable() : void{
		for(var i : int = 0; i < artefactTriggers.length; i++){
			artefactTriggers[i].gameObject.layer = 2;
		}
	}

	public function MakeTriggerable() : void{
		for(var i : int = 0; i < artefactTriggers.length; i++){
			artefactTriggers[i].gameObject.layer = 0;
		}
		Destroy(infoPanel);
	}

	private function GetTextFrom(filePath : String) : String{
		var myText : TextAsset = Resources.Load(filePath) as TextAsset;
		var myString : String = myText.text;

		myString = CleanText(myString);

		var thisArray : Array;
		var artefactList : String[];
		thisArray = myString.Split(';'[0]);
		artefactList = thisArray;

		var content : Array;
		for(var i : int = 0; i < artefactList.length; i++){
			content = artefactList[i].Split(':'[0]);
			if(content[0] as String == name){
				return content[1] as String;
			}
		}

		return "!TEXT NOT FOUND!";
	}

	private function CleanText(thisString : String) : String{
		thisString = thisString.Replace("\n", "");
		thisString = thisString.Replace("\r", "");
		thisString = thisString.Replace("|", "\n");

		return thisString;
	}
}