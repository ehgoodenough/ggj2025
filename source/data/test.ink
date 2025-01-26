
-> deltador


=== balbadore ===
pokaspokdappaoskdpasodk
Hello
+ Go to cave
    goto(www.neopets.com)
    ->END
+ Go to overworld
    goto(/overworld)
    ->END
-> END


=== start ===
Hello World. Die in my world.
-> END

=== deltador ===
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
goto(/overworld)
->DONE

=deltadore_denial
{King Deltador says, “Unfortunately kingship is a busy life, so I don’t have time to answer questions. My subjects await.”|King Deltador says, “In my father’s reign subjects were expected not to ask impertinent questions of their king. Maybe I should bring that back.”}
    ->tutorial_kauvara_quest
    
->END