VAR inventory_cloak = false
VAR inventory_key = false
VAR inventory_sign = false
VAR inventory_banner = false
VAR inventory_treasure = 0
VAR inventory_boat = false
VAR inventory_coupon = false

=== deltador ===
*{not tutorial_discussion} -> tutorial_discussion
+{inventory_cloak} -> dialogue_cloak
+ -> dialogue_start
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
        **“Right, this is the medieval times. Never mind.” 
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
~ inventory_cloak = true
*Return to Overworld
goto(/overworld)
->DONE
    
=deltadore_denial
{King Deltador says, “Unfortunately kingship is a busy life, so I don’t have time to answer questions. My subjects await.”|King Deltador says, “In my father’s reign subjects were expected not to ask impertinent questions of their king. Maybe I should bring that back.”}
    ->tutorial_kauvara_quest
    
=dialogue_cloak
King Deltador says, “Kauvara should be somewhere just outside the city, to the west. Tell her King Deltador sent you.”
        +“Thank you.”
        +{partywizard1} “Who’s that weird wizard outside her pasture?”[] you say
            King Deltador says, “Don’t even get me started on him. He just showed up one day and he’s been the most disrespectful wizard I have ever encountered. He always seems to be everywhere and I cannot fathom how he moves around so quickly. He’s certainly not one of my subjects.”
            ++“He was very helpful.”[] you say
            King Deltador says, “Well, I’m glad to hear that, at least. Perhaps he can be of use to my domain yet.”
                +++[“Let’s hope!”]
                ->dialogue_cloak
        -goto(/overworld)
        ->DONE

=dialogue_start
{King Deltador says, “I see you found Kauvara! She looks lovely in the sunlight, doesn’t she? Or what I mean to say is, thank you for returning that cloak for me. I hope my sword serves you well, and you in turn use it to serve my domain.”|King Deltador says, “How can I help you, adventurer?”}
    +{partywizard1} “Who’s that weird wizard outside her pasture?”[] you say
        --King Deltador says, “Don’t even get me started on him. He just showed up one day and he’s been the most disrespectful wizard I have ever encountered. He always seems to be everywhere and I cannot fathom how he moves around so quickly. He’s certainly not one of my subjects.”
        ++“He was very helpful.”[] you say
        --King Deltador says, “Well, I’m glad to hear that, at least. Perhaps he can be of use to my domain yet.”
        ++[“Let’s hope!”]
        ->dialogue_start
    +“Can you tell me more about your domain?”[] you ask
        King Deltador says, “This area of Neopia lay ungoverned for many years while my father’s court lay under a magical sleep. Kauvara and her band of young adventurers released us from the spell, and ever since the land has flourished under my father’s rule, and now mine. I owe Kauvara a great deal.”
        ++“Who put you under a magical sleep?”[] you ask
            King Deltador says, “I was but a babe when the curse was placed. I have very little memory of that time. There is a written history of it in the great library to the west of the Hills of Jub, if you are truly interested in learning more and not just asking to be polite.”
                +++"No, I really want to know.”
                +++“I was just asking to be polite.”
                ---King Deltador says, “Well, either way, the story is told in full in the library.”
                +++“I’ll check it out.”[] you say
                ->dialogue_start
    +{eatsbugs} “Can you tell me more about adventuring in your domain?”[] you ask.
        King Deltador says, “I try my best to encourage young adventurers where I can. I too was once young and inexperienced, and Deltador’s Domain is one of the safest places in Neopia for an adventurer to start out. Many hopefuls venture through here, and most come out of it stronger and wiser for it.”
        ++"Most?"
            King Deltador says, “There is a great evil threatening us, after all. Not everyone has withstood it. But that is simply the way of adventuring. You must first venture into the cave if you ever hope to find the treasure, as my father always said.”
            +++“Eatsbugs seemed upset that so many adventurers had visited her family’s cave.”[] you say
        ++“Eatsbugs seemed upset that so many adventurers had visited her family’s cave.”[] you say
        --King Deltador says, “Eatsbugs and I have spoken about this many times. She is my most frequent supplicant, and I know her views on the matter quite well. But the fact is that adventuring is a key component of any realm’s economy, and until I can find the right adventurer to succeed me and serve as my champion, she and her family will simply have to live with it.”
        ++“Wait, are you auditioning adventurers?”[] you ask
            King Deltador says, “I wouldn’t put it quite so crassly, but I suppose I am. Don’t worry, you’re doing very well so far.”
            +++“Thanks, I guess.”
            ->dialogue_start
    +{inventory_sign}“I have this signpost.”[] you say
        King Deltador says, “You uprooted my sign? Why would you go and do that? Kauvara will be so upset.”
        ++“I needed it.”[] you say
        King Deltador says, “Poor Kauvara will be inconsolable. She painted that herself, you know. Now I’ll have to spend all night comforting her because you went and stole it. That’s poor adventuring behavior.”
            +++“Sorry. But I’m still taking it.”[] you say
            ->dialogue_start
    +{inventory_banner}“Can you tell me more about this torn banner?”[] you ask
        King Deltador says, “They aren’t pleasant memories. But if you truly wish to become my adventurer, you must know them. This is the result of the last time a band of my people tried to take Kass’s Keep and bring him back to me unharmed. That is why you must now defeat him. There is no other way.”
        ++“Can you tell me more about Kass’ Keep?”[] you ask
            King Deltador says, “It used to be my father’s summer palace. Kass and I spent many days there together as children, and when I inherited the throne I bequeathed it to him as a gesture of our friendship. Now he has corrupted it with his villainy and holds my father’s treasure captive, which I gave to him for safekeeping. It sorrows me greatly.”
                +++“Is that why you wanted him unharmed?”[] you ask
        ++“Why did you want him unharmed?”[] you ask
        --King Deltador says, “Kass and I have not always been at odds. Long before he began calling himself Lord Kass, we were the closest of friends. It is not only out of respect for his mother’s love for him that I still hold hope for his redemption.”
        ++“But you told me to defeat him.”[] you say
            King Deltador says, “If you can find another path, I would welcome it. I do miss him.”
            +++“I’ll try.”
	            ->dialogue_start
    +{boatseller}“Can you tell me more about Kass?”[] you ask
        --(kass_betrayal)King Deltador says, “I’d really rather not get into it. The wound of his betrayal is still too fresh.”
        ++“What about the decrepit old guy who lives with him?”[] you ask
            ---King Deltador says, “You mean his husband? Why, he’s the same age as Kass and I. Are you saying we look decrepit as well? I jest, I jest. I am not quite so insecure as to rely on my subjects for my self-esteem.”
            +++“That’s his husband? I thought he was a boat seller.”[] you say
            ---King Deltador says, “He’s both. We were part of a yachting association together for many years before Kass and I parted ways and the friendship soured. I do miss our outings together… But the past is the past. I’m much too busy with kingship these days for frivolous things like yachting.”
            +++“Sounds like it.”[] you say
            ->dialogue_start
        ++“How long ago did this betrayal happen?”[] you ask
            ---King Deltador says, “Nearly twenty years ago now. We developed a… difference of opinion, surrounding my life choices, and the rift merely grew deeper from there. I fear now it is unbridgeable.
            +++“Your life choices regarding Kauvara?”[] you suggest
            ---King Deltador says, “I will admit that was perhaps an initial factor, but our differences run much deeper now. That is all I will say on the matter.”
            +++Say, “I’ll get it out of you eventually.”[] you say
            ->kass_betrayal
    +{inventory_treasure>0}“Can you tell me more about this treasure?”[] you ask
        --King Deltador says, “My father’s gold cufflinks! How in Neopia did you manage to retrieve them? Is Kass subdued? Are we free of his menace?”
        ++“No, I just took it. He didn’t see me.”[] you say
        --King Deltador says, “I see. Well, at least it’s nice to have this memento of my father again. Although I do have very little need of cufflinks…”
        ++“I grabbed more things too.”[] you say
            King Deltador says, “My goodness, you have quite a haul. I can’t help thinking your time might have been better spent in defeating Lord Kass. But I suppose every adventurer has their own priorities.”
            +++"Can I sell them?"[] you ask
        ++"Can I sell them?"[] you ask
        --King Deltador says, “It’s refreshing to see such an entrepreneurial spirit these days! Very well, I suppose since I have no practical use for them you may consider them a gift and sell them if you wish. Do you know how to buy and sell items here?”
        ++“No, I’ve never participated in a market economy before.”[] you say
        --King Deltador says, “Ah, from humble peasant stock, are you? The best adventurers always are. Never fear, the merchants in my domain are always willing to talk you through a transaction. The nearest market town is Meridell, located at the base of the Hills of Jub. There you can sell any items you’ve acquired during your travels and purchase new equipment to aid you in your quest.”
        ++“How much are the cufflinks worth?”[] you ask
        --King Deltador says, “To me, they are a priceless heirloom. To the traders in Meridell, likely around five gold pieces.”
        ++“Now I feel bad about selling them.”[] you say
            King Deltador says, “No, no, I really have been meaning to de-clutter around the palace. You’re doing me a favor in taking them off my hands.
            +++“You said only five gold pieces?”
        ++“Only five gold pieces?”[] you ask
        --King Deltador says, “There’s no need to be ungrateful. Five gold pieces will buy you a Weak Healing Potion. Those cufflinks might save your life.”
        ++“Sorry. Thank you for the cufflinks.”[] you say
        ->dialogue_start
    +{inventory_boat}“Can you tell me more about lava boats?”[] you ask
        --King Deltador says, “As many headaches as those two have caused me, I have to admit it’s an ingenious scheme. Capitalizing on the volcanic eruption like that. If I still had possession of the summer palace, I would probably have done the same.”
        ++“Is that why you want Kass defeated? So you can take back the Keep?”[] you ask 
            ---King Deltador says, “Not at all! What need do I have for money? I simply wish to regain my family’s ancestral home and purge a great evil from my domain. Kass is known for his greed, not me.”
            +++“His husband seems very fond of him.”[] you say
            ---King Deltador says, “Well, there’s no accounting for taste. I admit it would pain me to see my old friend bereaved, but it’s for the greater good.
            +++“Do you and the Boat Seller keep in touch?”[] you ask
        ++“Do you and the Boat Seller keep in touch?”[] you ask
        --King Deltador says, “I send them an anniversary card every year, but I haven’t heard back in nearly a decade. I’m afraid that friendship has well and truly lapsed. If you see him again, please give him my well wishes.”
        ++“Will do.”
        ->dialogue_start
    +{inventory_coupon}“Can you tell me more about this coupon for a water boat?”[] you ask
        --King Deltador says, “Oh, delightful! I haven’t seen one of those around in a while. I issued them, you see, in the hopes of encouraging my subjects to make large purchases as part of an economic stimulus package. We live on a peninsula and yet so few of my people own boats. I thought it was a brilliant idea.”
        ++“Did you consult the Boat Seller before you issued it?”[] you ask
        --King Deltador says, “Why would I have? I’m the king. I run the government and the treasury. If I want to issue a coupon, merchants should honor it. This is yet another example of Kass’s evil influence on my domain. Uppity boat sellers thinking they don’t have to sell people water boats at a discount just because ‘it’s dangerous’ and ‘there are mines in the water’. Anarchy, I say!”
        ++"Mines?"
        --King Deltador says, “Yes, the harbor was mined during the last attempt on Kass’ Keep. A skilled mariner could avoid them, in my opinion, but apparently I am alone in that. The old adventuring spirit truly is dying out.”
        ++“I think I’ll stick to the lava.”[] you say
        ->dialogue_start
    
    +"Goodbye"
-goto(/overworld)
->DONE
->END

=== partywizard1 ===
*{not partywizard1_first} -> partywizard1_first
*{partywizard1_first} -> dialogue_start
=partywizard1_first
Party Wizard says, “Yeah, it’s been like that for a bit. Totally impassable. Unless you know your way around this website like I do.”
    -(first_convo)
    *“You know this is a website?”[] you ask
        Party Wizard says, “Do I look like I’m from around here? [more stuff about runescape idk i never played it]”
        ->first_convo
    *“It wasn’t always like this?”[] you ask
        Party Wizard says, “Look around you. This site is dying. Ever since they killed Flash, half of the pages don’t work. This game used to have sick animations, but now they’re all glitched out. Pretty uncool, if you ask me.”
        ->first_convo
    *“How do I get around it?”[] you ask
        ->dialogue_nokey
        
=dialogue_start
+{dialogue_door} -> dialogue_teleport
+{door_conversation} -> dialogue_door
+{not inventory_key} ->dialogue_nokey
+{inventory_key} ->dialogue_key
->DONE
=dialogue_teleport
Party Wizard says, “Good luck. Smell ya l8r!”
    *“Smell ya l8r.”
    -goto(/overworld)
->DONE
=dialogue_door
Party Wizard says, “Yeah, that one was a pretty dope flash animation of, like, a gate opening and this really picturesque field with flowers swaying in the breeze and stuff. Now poof! All gone. And the bummer thing is I can’t even use my handy url trick to get in there because I don’t know what the area is called.”
    *“Kauvara said there was a long way around but that it was dangerous.”[] you say
    -Party Wizard says, “Yeah, there was this crazy volcanic eruption a while ago. Sick lava flows way out into the ocean. Might be worth checking out just for the sight.”
    *“I guess if that’s the only way around I’ll try it.”[] you say
    -Party Wizard says, “That’s the spirit! Good luck. Smell ya l8r!”
    *“Smell ya l8r.”
    -goto(/overworld)
->DONE
=dialogue_nokey
Party Wizard says, “[Jargon about how to use the url bar pls help]”
    +“That feels like cheating, but thanks, I guess.”[] you say
    *“Is that how you got here?”[] you ask
    -Party Wizard says, “Work smarter, not harder. Now go forth, conquer, et cetera et cetera. Come find me again if you ever need advice.”
    *“Thank you.”
    -goto(/overworld)
->DONE
=dialogue_key
“What are you waiting for? You have the key, try it out.”
    +“Okay, thanks.”
    -goto(/overworld)
->DONE
-> END

=== boatseller ===
goto(/overworld)
->DONE
-> END

=== door_conversation ===
goto(/overworld)
->DONE
-> END

=== kauvara ===
*{not kauvara_first} -> kauvara_first
+{kauvara_first} -> dialogue_start
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
                    ~ inventory_key = true
                    ~ inventory_cloak = false
                    goto(/overworld)
                    ->DONE
    *"Why are you going there tonight?”[] you ask
    Kauvara says, “Oh, just to chat. A court wizard must be in close contact with her king, you know. And Delt is so easy to talk to, especially late at night when he’s set down the mantle of kingship for a bit.”
        **[“Of course.”]
        ->kauvara_cloak
=dialogue_start
Kauvara says, “The lock on the gate can stick sometimes, but you just have to wiggle the key a little bit and it should open up just fine!”
    +Return to map
-goto(/overworld)
->DONE
-> END

=== eatsbugs ===
*{not eatsbugs_first} -> eatsbugs_first
*{dialogue_sign} -> eatsbugs_end
*{not inventory_sign} -> dialogue_no_sign
*{inventory_sign} -> dialogue_sign
=eatsbugs_first
Eatsbugs says, “Hey, careful! It’s dark in there. You’d need a lantern to see anything, and it doesn’t look like you’ve found one yet.”
    *“It can’t be that dark.”[] you say
    -Eatsbugs says, “I promise you it is. Can’t-see-your-hand-in-front-of-your-face sort of dark.”
    *“Aren’t bats blind anyway?”[] you ask
    -Eatsbugs says, “That’s an incredibly rude question, you know. We don’t have hands either, but that doesn’t mean I can’t use a figure of speech just like you can. The nerve!”
    *“Sorry, I didn’t mean to upset you.”[] you apologize
        --(progress){not lantern:Eatsbugs says, “It’s alright, I know you didn’t mean it. I just have a headache because the light hurts my eyes. My family are all sleeping, but someone has to stand guard outside to keep intruders like you from coming in and disturbing them. That was a figure of speech too, in case you were wondering.”|}
        **“Wouldn’t a lantern disturb them even more?”[] you ask
        --(rude_response){Eatsbugs says, “Now you see why I have to stand guard. What I’d really like is to have some sort of signpost. ‘Caution; bats sleeping’ or something like that. It doesn’t even need to be a new signpost! I could just paint over it. Hey, if you see a signpost anywhere on your way to the city, do you think you could bring it back for me?”|So are you gonna get me that sign or what?"}
        **“What’s in it for me?”
            ---Eatsbugs says, “Fine, okay, I’ll tell you a secret: there’s nothing worth looking for in this cave. Adventurers carried off all the valuable rocks years ago, and still I have people showing up here every other day wanting to look around and ruin my family’s rest. All I want is for your type to leave the six hundred of us in peace. If you bring me a signpost to help with that, I might tell you another secret. Good enough?”
            ***“I’ll see what I can find.”[] you say
            ---Eatsbugs says, “Hey, thanks! You’re not so bad after all. Jeez, I’m tired. Hurry up with that signpost, will you?”
            goto(/overworld)
            ->DONE
        **“I didn’t know bats could write.”
            ---Eatsbugs says, “It’s clear there are a lot of things you don’t know.  ->rude_response
    *“I’ve got pretty good night vision. I bet I could see in there.”[] you say
        --(lantern){Eatsbugs says, “Do you think you’re the first adventurer who’s come my way? You need a lantern. End of story.”|}
        **“Can I just go inside and try it?”[] you ask
            ---Eatsbugs says, “Be my guest. Don’t trip over any stalagmites.”
            ->lantern
        **“Where can I get a lantern?”[] you ask
            ---Eatsbugs says, “Beats me, but there’s a bigger city to the east, just over the Hills of Jub. They might have a shop with that sort of thing.”
            ->lantern
        **->progress
->DONE
=dialogue_no_sign
Eatsbugs says, “Have you found me a signpost yet? No? Then why are you here?”
    *“Sorry to bother you.”
    goto(/overworld)
    ->DONE
=dialogue_sign
Eatsbugs says, “Wow, thank you! I didn’t think you’d actually help me. I’m sorry for doubting you.”
    *“You said you’d tell me another secret?”[] you ask
    -Eatsbugs says, “I said I might tell you a secret. But alright. [info about hp in the swamp?]”
    *“Thank you.”[] you say
    -Eatsbugs says, “Don’t mention it. Hey, good luck on your quest or whatever it is you adventurers do! I’m about to go sleep for a week.”
    *Return to Map
    goto(/overworld)
    ->DONE
->DONE

=eatsbugs_end
Eatsbugs says, “[info about hp in the swamp]”
    *"Thank you"
    goto(/overworld)
    ->DONE
->END