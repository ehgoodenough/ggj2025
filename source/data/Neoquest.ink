VAR inventory_cloak = false
VAR inventory_key = false
VAR inventory_sign = false
VAR inventory_banner = false
VAR inventory_treasure = false
VAR inventory_boat = false
VAR inventory_coupon = false
VAR inventory_wand = false

=== deltador ===
image(deltador)
title(Deltador, King of the Domain)
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
    //+{inventory_sign}“I have this signpost.”[] you say
        //King Deltador says, “You uprooted my sign? Why would you go and do that? Kauvara will be so upset.”
        //++“I needed it.”[] you say
        //King Deltador says, “Poor Kauvara will be inconsolable. She painted that herself, you know. Now I’ll have to spend all night comforting her because you went and stole it. That’s poor adventuring behavior.”
            //+++“Sorry. But I’m still taking it.”[] you say
            //->dialogue_start
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
    +{inventory_treasure}“Can you tell me more about this treasure?”[] you ask
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
    +(anniversary_card){inventory_boat}“Can you tell me more about lava boats?”[] you ask
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
    +{inventory_wand}“Can you tell me more about The Wand of the Dark Faerie?”[] you ask
        --King Deltador says “Long ago, when Neopia was young, a faerie tried to take over the realm. Her name has been lost to history, and she is known now only as The Darkest Faerie. The Faerie Queen Fyora imprisoned her at the bottom of the sea to keep the world safe. But after one thousand years the spell trapping her there had weakened enough to allow her to escape and return to conquer the realm she had failed to subdue. She attacked Faerieland and captured Queen Fyora. Only by working together with the original founders of this realm, my ancestors, were a pair of young adventurers able to once again defeat and imprison her. The wand she had used in capturing Fyora was left in the safekeeping of my great-great-great-great-great-great grandmother and has been passed down through the generations ever since.”
        ++“Oh. Okay. I’ll keep that in mind.”[] you say
        ->dialogue_start
    
    +"Goodbye"
-goto(/overworld)
->DONE
->END

=== partywizard1 ===
image(partywizard)
title(Party Wizard)
*{not partywizard1_first} -> partywizard1_first
+{partywizard1_first} -> dialogue_start
=partywizard1_first
Party Wizard says, “Yeah, it’s been like that for a bit. Totally impassable. Unless you know your way around this website like I do.”
    -(first_convo)
    *“You know this is a website?”[] you ask
        Party Wizard says, “Do I look like I’m from around here? Do I look like I’m from around here? Where I’m from, I went on grand adventures and fought formidable foes with the power of the gods! And did you know this party hat is worth millions in gold? Well, it used to be…things change quickly in this economy. Ah, to be back in the dot com bubble…”
        ->first_convo
    *“It wasn’t always like this?”[] you ask
        Party Wizard says, “Look around you. This site is dying. Ever since they killed Flash, half of the pages don’t work. This game used to have sick animations, but now they’re all glitched out. Pretty uncool, if you ask me.”
        ->first_convo
    *“How do I get around it?”[] you ask
        ->dialogue_nokey
        
=dialogue_start
+{dialogue_door} -> dialogue_teleport
+{door} -> dialogue_door
+{not inventory_key} ->dialogue_nokey
+{inventory_key} ->dialogue_key
->DONE
=dialogue_teleport
Party Wizard says, “If you noticed, some of the glitches around here will send you to different locations on the map.  If you pay attention to the URL bar, you can see the locations you are being sent to by referencing X and Y coordinates.  You can even manipulate those coordinates to trigger your own teleport to go anywhere you want!  I've been playing around with them, and they can't get me everywhere but I can go a lot of places that would otherwise be inaccesible without them!  Good luck. Smell ya l8r!”
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
Party Wizard says, “If you noticed, some of the glitches around here will send you to different locations on the map.  If you pay attention to the URL bar, you can see the locations you are being sent to by referencing X and Y coordinates.  You can even manipulate those coordinates to trigger your own teleport to go anywhere you want!  I've been playing around with them, and they can't get me everywhere but I can go a lot of places that would otherwise be inaccesible without them!”
    +“That feels like cheating, but thanks, I guess.”[] you say
    *“Is that how you got here?”[] you ask
-Party Wizard says, “Work smarter, not harder. Now go forth, conquer, et cetera et cetera. Come find me again if you ever need advice.”
    +“Thank you.”
    -goto(/overworld)
->DONE
=dialogue_key
“What are you waiting for? You have the key, try it out.”
    +“Okay, thanks.”
    -goto(/overworld)
->DONE
-> END

=== partywizard2 ===
image(partywizard)
title(Party Wizard)
Party Wizard says, “That’s the edge of the tutorial map. You’ll have to get that sword if you want to go any further that way.”
    +“Okay.”[] you say
    *“Can I take your signpost?”[] you ask
        --Party Wizard says, “No! I need this one. Go find your own.”
        **“It’s not nailed down.”[] you say
        --Party Wizard says, “You got me there. Alright, you win. I have spares anyway.”
        **"Thanks"[] you say
        ~ inventory_sign = true
    -goto(/overworld)
->DONE
->END

=== partywizard3 ===
image(partywizard)
title(Party Wizard)
Party Wizard says, “This place used to look so freaking cool. Some huge battle or something, idk. Lots of skeletons and broken weapons and stuff.  The ground around here has turned totally toxic as a result, you will slowly lose health the longer you stay here until you have some kind of poison resistance, or like 100000000 health. Now all the image files are borked and those tiles are glitched out. But on the upside, that’s how I learned to teleport, so I guess it’s not all bad.  And as a headsup, some of the glitches have different teleportation behaviors than others.”
    +“I guess.”[] you say
    -goto(/overworld)
->DONE
->END

=== boatseller ===
image(boatseller)
title(Boat Seller)
*{not boatseller_first} -> boatseller_first
+{boatseller_first} -> dialogue_start
=boatseller_first
The Boat Seller says, “How did you get in here? Kass is guarding the throne room. He’s been in such a territorial mood lately and scared off all my customers. I wasn’t expecting to see anyone in my shop ever again.”
    *“I snuck past him.”[] you say
        The Boat Seller says, “I suppose that isn’t hard to do. He gets very focused on his external monologues. Sometimes I have to shake him to snap him out of it, poor sweet thing. But you’ll have to leave through the back entrance here. He’ll be furious with himself if he knows he let an adventurer get by him.”
        ++“How am I supposed to leave through there?”[] you ask
    *“What do you sell?”[] you ask
    -(boat_intro){The Boat Seller says, “I sell boats. Lava boats, to be precise. You see that lava flow? There’s only one way to traverse it, and I’ve cornered the market. Only problem is, since I’ve had so few customers lately I’m a bit overstocked, so I’ll give you one for free."| I'm sure business will take off any day now.”}
    *“You run a shop out of the back of a fortress?”[] you ask
    The Boat Seller says, “Do you see any other entrances to the lava flow around here? Location is key.->boat_intro
    *“You said Kass scared off all your customers?”[] you ask
    The Boat Seller says, “Well, don’t tell him I said this, but he doesn’t have the most natural customer service manner, you see. It’s been a bit of a struggle getting him to stop immolating prospective buyers. And then of course there was that siege on the Keep a while back, which is of course terrible PR. Kass won’t let me clean up the skeletons and scorch marks out front, either. Don’t get me wrong, I wouldn’t change who he is for the world, but it does make being a businessman difficult. Then again, so does giving out freebies.->boat_intro
    *“You’ll give me a boat for free?”[] you ask
    -The Boat Seller says, “Ordinarily I wouldn’t just throw away merchandise like that, but quite frankly the only way out of this Keep without going back past Kass is through the lava, and I’d prefer the lost revenue to dealing with one of his moods.”
    *“Do you like working for Kass?”[] you ask
    -The Boat Seller says, “Oh, you think you’re a comedian, I get it. We’re equal partners in this relationship, thank you very much.”
    *“What?”[] you ask
    -The Boat Seller says, “Take your free boat before I change my mind.”
    *“Okay, give me the boat,”[] you say
    -The Boat Seller says, “Unbelievably ungrateful. Fine. Look I'm gonna be frank with you.  I gave you an overstock boat, and those things don't hold up like they should.  There is a full 3-month warranty on all of my products, so if anything happens talk to me again and I can see what I can do about replacing your product.”
    *Return to Overworld
    ~ inventory_boat = true
    goto(/overworld)
->DONE
=dialogue_start
The Boat Seller says, “Hurry on out of here before Kass sees you! I’m not letting you ruin the lovely dinner I have planned for us.”
+{inventory_boat} "What do I do with this boat?" -> dialogue_boat
+{not inventory_boat} “{Your lava boat isn't lava shark proof|Your lava boat isn't lava shark proof|Your lava boat caught on fire|Your lava boat caught on fire|I got mugged and lost my boat|I got mugged and lost my boat|Your lava boat doesn't float on water|Your lava boat doesn't float on water}. Can I have a new one?”
-> dialogue_noboat
*{inventory_coupon} "I have this coupon for a water boat. Can I have one of those instead?" 
-> dialogue_coupon
+Return to Overworld
    --goto(/overworld)
->DONE
=dialogue_boat
The Boat Seller says, “Look I'm gonna be frank with you.  I gave you an overstock boat, and those things don't hold up like they should.  There is a full 3-month warranty on all of my products, so if anything happens talk to me again and I can see what I can do about replacing your product.”
+Return to Overworld
goto(/overworld)
->DONE
=dialogue_noboat
{->dialogue_noboat1|->dialogue_noboat2|->dialogue_noboat3|->dialogue_noboat4}
=dialogue_noboat1
The Boat Seller says, “I gave you free merchandise, you destroyed it, and now you want more? Is this the kind of adventurer Deltador wants to nurture? You young people and your entitlement, good lord.”
    *“How old are you? Just out of curiosity.”[] you say
        --The Boat Seller says, “Don’t push your luck. Do you want another boat or not?”
        **“Sorry, yes, I want another boat.”
    *“It’s actually really hard to navigate a lava flow.”[] you say
        --The Boat Seller says, “I guess I wouldn’t know. I just make the boats. You’re my first customer and you didn’t even pay for it. Fine, we’ll call the first one a quality control test. Don’t crash this one.”
        **Say, “I’ll try not to.”
    -~ inventory_boat = true
    goto(/overworld)
->DONE
~ inventory_boat = true
goto(/overworld)
->DONE
=dialogue_noboat2
The Boat Seller says, “Again? How hard can it really be? It’s just like sailing, but in lava. Are you sure you’re cut out to be an adventurer?”
    *“You don’t have to be mean about it. Sailing is difficult.”[] you say
    -The Boat Seller says, “Don’t I know it! I never had the competitive edge with it, not like Deltador had. But I never destroyed a boat, let alone two. I’m not sure you can be trusted with a third. Who’s to say you won’t crash that one as well and come back to beg me for a fourth?”
    *“I won’t crash a third time.”[] you say
    *“Did you and King Deltador sail together?”[] you ask
        --The Boat Seller says, “Yes, in our youth. Kass never came with; he hates water. But Deltador and I made quite a formidable yachting team during our time together. Those days are over, alas. Sometimes you just have to pick sides.”
        **“Do you really think reconciliation is impossible?”[] you ask
        --The Boat Seller says, “You don’t know Deltador and Kass like I do. Two of the most stubborn neopets you’ll ever meet! Well, except that you won’t meet Kass if I have any say in it. Take this boat and try not to crash it this time.”
        **“I won’t crash a third time.”
    -The Boat Seller says, “That’s what they all say.”
    *“I thought you didn’t have any customers.”[] you say
    -The Boat Seller says, “Insolence! Take your replacement boat and get out of my sight. Your impudence is giving me indigestion. I’ll have to take tums before dinner or I won’t be able to handle the spices. Kass loves his cayenne.”
    *“Good luck with dinner.”[] you say
    -~ inventory_boat = true
goto(/overworld)
->DONE
=dialogue_noboat3
The Boat Seller says, “I told you this would happen! I said you’d crash a third time and come back begging for more boats. Well, there aren’t any more boats, how about that? You’ve already wasted my entire afternoon, and you’re not going to keep wasting my evening. I have a romantic dinner to attend.”
    *“Okay, I’ll just go back out through the throne room.”[] you threaten
    -(anniversary_threat){The Boat Seller says, “Wait! Please, come back, don’t do that. I didn’t tell you the whole story. Tonight’s dinner is special because… it’s our anniversary. I can’t let anything ruin that. You can’t go back through where he could see you.”|}
    *“Give me another boat, then.”
    *{deltador.dialogue_start.anniversary_card}“Did Deltador send you an anniversary card?”
        --The Boat Seller says, “How do you know about that? Never mind. Yes, he did, and no, I’m not showing it to my husband. His mother’s letters only upset him, and I know hearing from Deltador would only make things worse. Today is supposed to be a day just for the two of us. Not the two of us plus one nosy adventurer who can’t sail.”
        ->anniversary_threat
    -The Boat Seller says, “Eating me out of house and home, I swear. Fine. Now scram; it really does make me sick to look at you.”
    *“Happy anniversary.”[] you say
    ~ inventory_boat = true
goto(/overworld)
->DONE
=dialogue_noboat4
The Boat Seller says, “I don’t know what I expected. You know what? I don’t care anymore. Take any boat you want. I don’t sell them anyway.”
+“Thank you.”
~ inventory_boat = true
goto(/overworld)
->DONE
=dialogue_coupon
The Boat Seller says, “That wretched Deltador! I thought I’d successfully destroyed all those. He never asked me before he issued them, and he expects me to honor them even now that I’ve moved on to lava boats. Does he honestly think water boats are at all profitable these days, when the waters are so treacherous? No, lava boats are where it’s at, and I’m sticking with them. I won’t accept a single piece of paper that originated from Deltador.”
    *"Okay....."[] you say
->dialogue_start
->DONE
-> END

=== crash1 ===
*{not crash1_first} -> crash1_first
+{crash1_first} -> crash1_pass
=crash1_first
You hit a lava shark, its fin slicing through the bottom of your boat like a lava knife through a butter hull.  You abandon ship and get dragged back by the current to Kass's Keep.  Stupid boat, you are going to have to give that fraudulent boat seller a piece of your mind.
*Return to Overworld
~ inventory_boat = false
goto(/overworld/48/30)
->DONE
=crash1_pass
goto(/overworld/46/27)
->DONE

=== crash2 ===
*{not crash2_first} -> crash2_first
+{crash2_first} -> crash2_pass
=crash2_first
The sail of the boat catches on fire from an errant spark.  The entire boat quickly goes up in flames, clearly only the outside of the boat is fireproof.  It slowly drifts back to Kass's keep through the magma current and you hop off right as it gives one last harrumph of effort before sliding under the molten waves.
*Return to Overworld
~ inventory_boat = false
goto(/overworld/48/30)
->DONE
=crash2_pass
goto(/overworld/44/25)
->DONE

=== crash3 ===
*{not crash3_first} -> crash3_first
+{crash3_first} -> crash3_pass
=crash3_first
Your guilt at almost ruining Boat Seller's anniversary dinner tears you apart.  You fall to the ground, stricken with remorse, and next thing you know you are curled up on the floor of Kass's Keep yet again.  You notice your pockets are empty and your boat is nowhere to be seen.  It appears that in your inconsolable state, someone robbed you. Thank goodness you still have your kidneys though.
*Return to Overworld
~ inventory_boat = false
goto(/overworld/48/30)
->DONE
=crash3_pass
goto(/overworld/46/21)
->DONE

=== crash4 ===
*{not crash4_first} -> crash4_first
+{crash4_first} -> crash4_pass
=crash4_first
You see the shore ahead of you, and in a moment of cocksure victory you accidentally sail into the water instead of the lava.  Your boat instantly sinks and you have to swim back to Kass's Keep.  I guess he wasn't kidding about it being a lava boat.
*Return to Overworld
~ inventory_boat = false
goto(/overworld/48/30)
->DONE
=crash4_pass
goto(/overworld/44/19)
->DONE

=== treasure ===
image(kass)
title(Lord Kass, Rightful Ruler of the Neopian Throne)
+{inventory_wand} -> treasure_empty
*{inventory_treasure == 12} -> treasure_weapon
+{inventory_treasure < 12} -> treasure_normal
=treasure_normal
You take {the gold cufflinks|pile of gems|the Lost Ark of the Covenant|some cayenne seasoning|a handful of goodberries|the dubloons|a holographic first edition Charizard|your childhood memories|the gold-plated tin-plated gold goblets|the unbelievably heavy anchor|Kass's anniversary gift|the Washington State Yearly Fishing License} without Kass noticing.
    +Return to Overworld
    ~inventory_treasure = inventory_treasure + 1
    goto(/overworld)
    ->DONE
=treasure_weapon
You find the SUPER AWESOME AMAZINGLY UBER COOL CHOCOLATELY COATED MEGA SUPER WAND OF THE DARK FAIRIE.  This is a legendary rarity weapon!
    *Wow, that's so exciting! Return to Overworld.
    ~inventory_wand = true
    goto(/overworld)
    ->DONE
=treasure_empty
Don't you have anything better to do?
    +Return to Overworld
    goto(/overworld)
    ->DONE
    

->DONE
=== door ===
+{not inventory_key} -> door_nokey
+{inventory_key} -> door_key
=door_nokey
You don't have a key to open this door
    +Return to Overworld
    goto(/overworld)
->DONE
=door_key
The large gold key sticks a little in the lock.
*Wiggle it back and forth
-By wiggling it back and forth you manage to find the right angle and insert it. 
 *Open the lock
-Slowly, with a creaky noise of complaint, the lock clicks open. 
*Push open the door
-You push your shoulder against the heavy wooden door. It, too, opens, slowly, revealing inch by inch a flower-filled meadow and
*and and and and and and and and and aaaaaaaã̴̛̛̛̛̛͉͓̣̱̥̰̱͎̟̤͌̾̔̄͒͂͆̿́͌̎̉̓̍̑̅͋̐͐͂͒͋̂̋̅̓̉̓͒̈́̈́̔̽̿̾͗͌͆͑̉̏̔̓̿̄̽̇͂̐̄̉̿̑̈̓̉͒́̀̃͑̄̽̀́̃̈́̾̉͋̒̋̀͑͊͆̄̏͂̈͑͑̃͋̿͑͐̀͆̊̃́́̐̃̄͐̆́̂̈̀͆̀͑̿͘͘̚̕̚̚͘̚̕̚̕͝͝͝͝͝͝ň̷̢̢̡̨̨̨̡̧̨̨̢̛̛̛̛̛̛̛̟̣̟̤̩̦͕̘̬͔̟̞͙̹̟͓̭̬̩̝̘͍̞̣̞͈͕̰̱͓͎̺̳̝̰̪̝̳̯̮̬̣̟̫͍͈̠̗̠̼̰̜̺̖̙̩̖̤̬̲̞̳͍̯̰͇͕̙̞̺̤̻̮̪̙̫̙̪͎̪̦͖̦̥̣̻̪̮̤̦̱͕̱̩̖͚̭̻͚̟͚̟͖̱̖̰̩͓̬͈̺̦̞͓̘̹̰̦̗͔̞̥͎͙̲̹͔̠͈̠͓̫̘̙͓̥͍͙̺̜̻͈̳̰͖̰̹̻̘̰̱̮̱͕̞̪͉̦̮͕̖̼̭̘͚̖̱̗̩̞͍̩̤̻̼̦͔͙͔̬̯̹͔̹͙̥̦̳͙̟̳̥͍̪̼̘̯̝̣͖̣͉͎̤͙̞̗͔̳͈̯̦̟͉̝̹̞̫̪̬̘͉̲͍̞͉̜̼͕̒̓͑̅̍̈́͑͑̈͋̓̒̐̓̈́̐̌̋͐̑̌̏̾̈̀͒͆̃͑̈́̃̿͐̈́̐͋̿͌̂̽̋̈́̈̿̒̇͊̃̿͊͌̓̐͛̊͌̅͊͆͑͂͐̀͆̋͗͂͆̀̈́͑͒̊̑̔́̆̉́͗̏̂̇͐͂̐͒̏̽̒̀̏̂̀̑̄̂̐̏̒̇̿̏͗̊͆̈͛̅̆̉͋̍͗̂͛͌̋́̂͌̓͊̒̿̿̂̓̔̆̓̿͒̿̊͑̍̆̋̈̇̒̒͆̀̑͂̔̐͋̏̈́͗̒͒̄͂̊̈́̀̔͑͂̔̑̃̌͛̌́̍̀̋̀͗́́̾̓͆͑̒͋̅̈́̓̎̋͋̾̽̊̈́̓̈́̂̈́̍̓̐͛̔͛̽̈́͋̍̾̉̀̃̐̇̃̀̍̈́͌̓̈̈́͗̋͊̃̎͗͋̇̀͌̐͒̄͂̈́̽̌͘̚̕͘̕͘̚͘̚̕̚̕͘̚͜͜͜͜͜͜͜͜͜͜͠͝͠͝͝͝͝͝͠͝ͅͅͅͅͅͅͅͅḑ̴̧̛̛̛̤̩̤͖͔̝̟̘͖̹̮̯͇̟̙̜̳̖͍͇̯͈͓̗̹͎͖͎͔̟̤̬͓̯̻̳̤͓̄́̑͒͐́̇̊͌̐͌͒̓͑̊̓̄̓̽͋͆̃̽̉͆̌̒̉̇̅́̓̄̅͊̈̍̏̋̇̈̍̔͊̋̂̃͒̌̿̏̈́͊̾͋̌̒̓͊́̂̂̚̕̚̕͜͜͝͝͝͠*

~ inventory_key = false
-goto(/overworld)
->DONE
-> END

=== kauvara ===
image(kauvara)
title(Kauvara, The Court Magician)
+{not kauvara_first and not inventory_cloak} -> kauvara_deflect
*{not kauvara_first} -> kauvara_first
+{kauvara_first} -> dialogue_start
=kauvara_deflect
You should speak to Deltador
    +Return to Overworld
    goto(/overworld)
->DONE
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
image(eatsbugs)
title(Eats Bugs)
*{not eatsbugs_first} -> eatsbugs_first
+{dialogue_sign} -> eatsbugs_end
+{not inventory_sign} -> dialogue_no_sign
+{inventory_sign} -> dialogue_sign
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
            ---Eatsbugs says, “Beats me, but there’s a bigger city to the West, just over the Hills of Jub. They might have a shop with that sort of thing.”
            ->lantern
        **->progress
->DONE
=dialogue_no_sign
Eatsbugs says, “Have you found me a signpost yet? No? Then why are you here?”
    +“Sorry to bother you.”
    goto(/overworld)
    ->DONE
=dialogue_sign
Eatsbugs says, “Wow, thank you! I didn’t think you’d actually help me. I’m sorry for doubting you.”
    *“You said you’d tell me another secret?”[] you ask
    -Eatsbugs says, “I said I might tell you a secret. But alright. Your URL bar can be used to navigate to different pages, but it can also be used to set player stats.  For example, if you delete everything after the \#/ in the URL bar and replace it with 'player/health/20', it will set your health to 20!”
    *“Thank you.”[] you say
    -Eatsbugs says, “Don’t mention it. Hey, good luck on your quest or whatever it is you adventurers do! I’m about to go sleep for a week.”
    ~ inventory_sign = false
    *Return to Map
    goto(/overworld)
    ->DONE
->DONE

=eatsbugs_end
Eatsbugs says, “Like, I said, your URL bar can be used to navigate to different pages, but it can also be used to set player stats.  For example, if you delete everything after the \#/ in the URL bar and replace it with 'player/health/20', it will set your health to 20!”
    +"Thank you"
    goto(/overworld)
    ->DONE
->END

=== gameover ===
image(kauvara)
title(Kauvara, Kass's Mom)
Kauvara says, “Oh good, you made it in! That key can be a bit tricky sometimes. Now that you have Delt’s old sword, I think you’re just about ready to head out into the wider world and begin your adventure. If you see my son while you’re out there, will you tell him his mother loves him?”
+Tutorial complete!
goto(www.neopets.com/404)
->DONE
->END
