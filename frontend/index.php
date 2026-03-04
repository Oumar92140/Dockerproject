<?php
$apiUrl = "http://backend:3000/api/messages";
$messages = [];

$response = @file_get_contents($apiUrl);
if ($response !== false) {
    $decoded = json_decode($response, true);
    if (is_array($decoded)) {
        $messages = $decoded;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Livre d'Or - Manuscrit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container py-5 my-5">

    <div class="text-center mb-5">
        <h1 class="display-4">Livre d'Or</h1>
        <p class="text-muted">Laissez une trace de votre passage dans notre manuscrit</p>
    </div>

    <div class="card bg-transparent border-0 mb-5">
        <div class="card-body p-4 border-top border-bottom" style="border-color: #d4af37 !important;">
            <form action="send.php" method="POST">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Votre Nom</label>
                        <input type="text" name="author" class="form-control" placeholder="Signez ici..." required>
                    </div>
                    <div class="col-md-8 mb-3">
                        <label class="form-label">Votre Message</label>
                        <textarea name="content" class="form-control" rows="2" placeholder="Écrivez votre message..." required></textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-2">
                    Placer dans le registre
                </button>
            </form>
        </div>
    </div>

    <div class="row">
        <?php if (!empty($messages)): ?>
            <?php foreach ($messages as $msg): ?>
                <div class="col-md-12 mb-4">
                    <div class="card message-card shadow-sm border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title mb-0">
                                    <?= htmlspecialchars($msg["author"] ?? 'Anonyme') ?>
                                </h5>
                                <small class="text-muted">
                                    <?= htmlspecialchars($msg["created_at"] ?? '') ?>
                                </small>
                            </div>
                            <p class="card-text mt-3" style="line-height: 1.6;">
                                " <?= htmlspecialchars($msg["content"] ?? '') ?> "
                            </p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="text-center py-5">
                <p class="text-muted">Le registre est encore vierge. Soyez le premier à écrire.</p>
            </div>
        <?php endif; ?>
    </div>

</div>

</body>
</html>