function downloadReflectie() {
    // Create a simple text file with reflection content
    const content = "EINDREFLECTIE\n\n" +
        "Rol 1:\nJouw reflectie hier...\n\n" +
        "Rol 2:\nJouw reflectie hier...\n\n" +
        "Rol 3:\nJouw reflectie hier...\n\n" +
        "Rol 4:\nJouw reflectie hier...\n";

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", "eindreflectie.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);}