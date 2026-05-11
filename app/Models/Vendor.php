<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['user_id', 'name', 'description', 'logo_url', 'is_open'])]
class Vendor extends Model
{
    use HasFactory;

    protected $casts = [
        'is_open' => 'boolean',
    ];

    /**
     * Get the user that owns the vendor.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the categories for the vendor.
     */
    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }
}
