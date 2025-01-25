->loop
===loop===
*->deltador_conversation
+->kauvara_conversation

=== deltador_conversation ===
*{not tutorial_discussion} -> tutorial_discussion
*{tutorial_discussion} -> dialogue_start
=tutorial_discussion 
King Deltador says, “Greetings, adventurer. You’ve arrived just in time.”
    *“Just in time for what?”[] you say. 
    ->tutorial_explanation
=tutorial_explanation
King Deltador says, “A great evil threatens my domain. It must be stopped soon, before it overtakes us all. I assume that’s why you’re here.”
    *“Why can’t you fight it yourself?”[] you say 
    King Deltador says, “Playing on my insecurities, I see! A sly maneuver. Alas, my adventuring days are over. My place is here overseeing the government. It’s time for new heroes to prove themselves.”
        **What is your role in the government?”[], you say
        --King Deltador says, “What a silly question! I’m the King, so I am the head of state. What other kind of government is there?”
        **[“Right, this is the medieval times. Never mind.”] 
            ->tutorial_explanation
    *“What evil?”[] you say
    King Deltador says, “It pains me to speak his name with malice, but… no, I will hold my tongue. You will find out soon enough if you continue on your quest. He is crafty and sly, his wisdom matched only by his greed and his hatred for me. Deep down I believe there is a seed of goodness in him that might be nurtured, if it isn’t too late. After all, he is his mother’s son.”
        **“That’s not a lot to go on. Can you tell me anything else?”[] you say
        King Deltador says, “Very well. His name is Kass, and that is all I will say. You can ask anyone in my domain for more information on him, though I doubt many will answer. His very name strikes fear into the hearts of my people. That is why you must defeat him.”
            ***"Did you say you knew his mother?"[] you say
        **“Do you know his mother?”[] you say
    -->tutorial_kauvara
    
=tutorial_kauvara
{“Of course I know his mother! That is, she is the court wizard here, so we speak every so often. By which I mean that I wouldn’t say I know her well, but we’ve met once or twice. At public functions.”|Deltador coughs nervously}
    *“Uh, sure.”[] you say.  
    ->tutorial_kauvara
    *“What’s her name?”[] you say
    ->tutorial_kauvara_quest
=tutorial_kauvara_quest
{King Deltador says, “Her name is Kauvara. In fact, since you’ve come, I have a favor to ask of you. She came by my throne room for an audience last night and left her wizard’s cloak behind on accident. I’m due to receive supplicants in a few minutes and cannot leave the palace, so I would appreciate it if you could return it to her. She should be somewhere just outside the city, to the west. She likes to graze there on sunny days.”|}
    *[“Graze?”]
    ->deltadore_denial
    *[“Last night?”]
    ->deltadore_denial
    *“What’s in it for me?”[] you say
-King Deltador says, “You drive a hard bargain, I see. That’s a good quality in an adventurer. Let’s see… I’ll make it worth your while. As a thank you for doing me this favor, I’ll give you my old adventuring sword. It’s a bit rusty by now, but it will serve you well as you start out on your quest. It’s in Kauvara’s pasture and you’ll need her key to enter. Tell her King Deltador sent you.”
->loop
    
=deltadore_denial
{King Deltador says, “Unfortunately kingship is a busy life, so I don’t have time to answer questions. My subjects await.”|King Deltador says, “In my father’s reign subjects were expected not to ask impertinent questions of their king. Maybe I should bring that back.”}
    ->tutorial_kauvara_quest
    
=dialogue_start
->DONE

=== kauvara_conversation ===
*{not kauvara_first} -> kauvara_first
*{kauvara_first} -> dialogue_start
=kauvara_first
{Kauvara says, “Oh, hello there! I wasn’t expecting to run into anyone out in the fields today. Is that my wizard’s cloak?”|"Is there anything else you needed?" Kauvara asks}
    *“King Deltador asked me to give {it|your cloak} to you.”[] you say
    ->kauvara_cloak
	*[“Oh, grazing. Makes sense.”]
	Kauvara says, “Yes! This is my favorite grazing field. Apart from my home pasture, of course, but sometimes a change of scenery is nice. I live just over there, to the east of the city. It’s lovely, but the mountains surrounding it block out the sun a bit.”
	->kauvara_first
	*“Are you a real wizard?” you ask
	Kauvara says, “Yes indeed! Although lately my powers haven’t been working quite like they should… I’m afraid my son might be up to his old tricks again. If only he would speak to me I’m sure I could talk some sense into him.”
	    **“Is your son Kass?”[] you ask
	    Kauvara says, “I’m not surprised you’ve heard of him. We haven’t spoken in several months and I’m starting to get a little worried. People say the most awful things! But I know my boy, and I know there must be more to it. He’s a bit wayward, but he’s a good boy deep down.”
	        ***“You’re his mother, so I guess you know best.” you say
	        ->kauvara_first
	    **King Deltador told me he was evil.”
        Kauvara says, “Delt said that? Oh, I will be having words with him tonight. He knows how I feel about that kind of talk. It’s the only thing we fight about, really.”
            ***“I don’t want to cause any arguments, forget I said anything.” you say
            ->kauvara_first
            
=kauvara_cloak
{Kauvara says, “That sweet man, he really didn’t need to! There was no rush. I’ll be back there tonight anyway. But it was very kind of you to come out here and return it.”|"Thank you again for bringing my cloak back to me"}
    *“He said I could have his sword.”[] you say
    Kauvara says, “Oh, my, what a great honor! I’ve been keeping that sword safe for him for decades, ever since he stopped adventuring. Now, I haven’t been polishing it that whole time, so it might be a bit rusty, but if he offered it to you then it’s yours. Here, I’ll give you my gate key and you can let yourself in. The sword is in the middle of the pasture, you can’t miss it.”
        **“Thank you.”[] you say
        Kauvara says, “The pleasure was all mine! But please make sure to bring the key back. I’ve had to make so many copies already because Delt keeps losing his.”
            ***“I’m…. sorry to hear that,”[] you say
            Kauvara says, “Oh, it’s nothing, really, I’m happy to help! You’re lucky I was around today. There used to be another path into my pasture, but ever since the volcano erupted it’s much too dangerous to go that way.”
                ****“Wait, volcano?”
                Kauvara says, “I told you the pasture was surrounded by mountains, silly! There’s no need to worry, though, because all the lava has luckily been flowing the other way, into the sea. The pasture is perfectly safe. Now shoo, you’re blocking my sunlight.”
                    *****Return to overworld
                    goto(/overworld)
                    ->loop
    *"Why are you going there tonight?”[] you ask
    Kauvara says, “Oh, just to chat. A court wizard must be in close contact with her king, you know. And Delt is so easy to talk to, especially late at night when he’s set down the mantle of kingship for a bit.”
        **[“Of course.”]
        ->kauvara_cloak
=dialogue_start
Kauvara says, “The lock on the gate can stick sometimes, but you just have to wiggle the key a little bit and it should open up just fine!”
->DONE

=== eatsbugs_conversation ===
*{not eatsbugs_first} -> eatsbugs_first
*{eatsbugs_first} -> dialogue_start
=eatsbugs_first
->DONE
=dialogue_start
->DONE
->END