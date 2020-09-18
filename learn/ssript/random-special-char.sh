chars='`1234567890-=~!@#$%^&*()_+'

out=$(echo $chars | fold -w1 | sort -R | tr -d '\n')
echo $out

read temp

while [ "$out" != "$temp" ]; do
    read temp
done