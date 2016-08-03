#pragma strict

public class TriggerForSound extends MonoBehaviour {
	
	@SerializeField
	private var aud : AudioSource;
	@SerializeField
	private var clip : AudioClip;

	public function Triggered(){
		//print("play sound?");
		aud.clip = clip;
		aud.Play();
	}
}