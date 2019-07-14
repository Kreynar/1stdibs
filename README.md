# The task

The task is vague, you have to check the short instruction in index.html and all javascript code and decide, what to do.

# Comments

At first, it didn't make sense, why there is so much logic in the code, that, at first sight, seems unrelated to the task, written in index.html. Then I started to view this task as a riddle, that purposely has vague instructions.

I went through the code and realized, that it expects one to type specific URL. Also noticed, that there are some mistakes in the code, that will prevent it from functioning. To get the message printed out, both URL and code need to be adjusted.

Progressing through the task, I figured out, what URL I should use as well as fixed afore mentioned code mistakes. Also, left some explanatory comments in the code. Even though it was tempting to refactor the code in order to make it cleaner, I restrained myself from doing most refactoring, as the current code with it's weird parts might be a part of the riddle.

One of the possible variants of the URL and input is:
`?=atoString&checksum=115#𐐷𐐷`
`Martynas`
I have chosen `checksum=115` as a second query parameter, because it's value (`115`) equals UTF-16 code for last letter in the input (`s`) and makes `getCheckSum` return `true`, which then makes the needed message to be printed.
